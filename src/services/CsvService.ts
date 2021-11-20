/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

export default class CsvService {
  inputFile: string;
  allLines: Array<any>;
  inputStream: any;

  constructor(inputFile: string) {
    this.inputFile = inputFile;
    this.allLines = [];
    this.inputStream = Fs.createReadStream(inputFile, 'utf8');
  }

  read() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    if (that.allLines.length === 0) {
      that.inputStream
        .pipe(
          new CsvReadableStream({
            parseNumbers: true,
            parseBooleans: true,
            trim: true,
            skipHeader: true,
            asObject: true,
          }),
        )
        .on('data', function (row) {
          that.allLines.push(row);
        })
        .on('end', function () {
          //console.log('No more rows!');
        });
    }
  }
}
