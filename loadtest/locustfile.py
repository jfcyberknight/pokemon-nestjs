from locust import HttpUser, task
from locust.env import Environment
from requests.structures import CaseInsensitiveDict
from random import randint

URL = "http://host.docker.internal:3000"
EMAIL = "<replace>"
PASSWORD = "<replace>"
AUTHENTICATION_TOKEN = "<replace>"


authorization_headers = CaseInsensitiveDict()
authorization_headers["Accept"] = "application/json"
authorization_headers["Authorization"] = "Bearer {}".format(
    AUTHENTICATION_TOKEN)
send_data_headers = CaseInsensitiveDict()
send_data_headers.update(authorization_headers)
send_data_headers['Content-Type'] = "application/json"


def responseFormatter(response, context):
    _context = context.upper()
    print("{0} | Request took in ms {1}".format(
        _context,
        str(response.elapsed)))

    if response.status_code != 200:
        print(_context + ' | statusCode:' +
              str(response.status_code) + ' | ', response.text)


class User(HttpUser):
    @ task
    def pokemon_api_get_root(self):
        context = "pokemon_api_get_root"

        with self.client.get(f'{URL}/',
                             catch_response=True) as response:
            responseFormatter(response, context)

    @ task(3)
    def pokemon_api_get_pokemons_with_limit_offset(self):
        context = "pokemon_api_get_pokemons_with_limit_offset"

        limit = randint(1, 800)
        offset = randint(1, 10)
        with self.client.get(f'{URL}/pokemons/{limit}/{offset}',
                             catch_response=True) as response:
            responseFormatter(response, context)

    @ task(2)
    def pokemon_api_get_pokemons_by_id(self):
        context = "pokemon_api_get_pokemons_by_id"

        pokemonId = randint(1, 5)
        with self.client.get(f'{URL}/pokemons/{pokemonId}',
                             headers=authorization_headers,
                             catch_response=True) as response:
            responseFormatter(response, context)


# setup Environment and Runner
env = Environment(user_classes=[User])
