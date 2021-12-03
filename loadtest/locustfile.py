from locust import HttpUser, task
from locust.env import Environment
from random import randint
from requests.structures import CaseInsensitiveDict

import random
import string

PORT = "5000"
URL = f'http://host.docker.internal:{PORT}'
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

    @ task
    def pokemon_api_post_pokemons(self):
        postPokemonId = 800
        context = "pokemon_api_post_pokemons"

        name = string.ascii_lowercase
        name = ''.join(random.choice(name) for i in range(10))

        type1 = string.ascii_lowercase
        type1 = ''.join(random.choice(type1) for i in range(10))

        type2 = string.ascii_lowercase
        type2 = ''.join(random.choice(type2) for i in range(10))

        postPokemonId += 1

        with self.client.post(f'{URL}/pokemons',
                              json={
                                  "Id": postPokemonId,
                                  "Name": name,
                                  "Type1": type1,
                                  "Type2": type2,
                                  "Total": randint(1, 1000),
                                  "Hp": randint(1, 1000),
                                  "Attack": randint(1, 1000),
                                  "Defense": randint(1, 1000),
                                  "SpAtk": randint(1, 1000),
                                  "SpDef": randint(1, 1000),
                                  "Speed": randint(1, 1000),
                                  "Generation": randint(1, 1000),
                                  "Legendary": 'true'
                              },
                              headers=authorization_headers,
                              catch_response=True) as response:
            responseFormatter(response, context)

    @ task
    def pokemon_api_patch_pokemons(self):
        context = "pokemon_api_patch_pokemons"
        name = string.ascii_lowercase
        name = ''.join(random.choice(name) for i in range(10))

        type1 = string.ascii_lowercase
        type1 = ''.join(random.choice(type1) for i in range(10))

        type2 = string.ascii_lowercase
        type2 = ''.join(random.choice(type2) for i in range(10))

        with self.client.patch(f'{URL}/pokemons/2',
                               json={
                                   "Name": name,
                                   "Type1": type1,
                                   "Type2": type2,
                                   "Total": randint(1, 1000),
                                   "Hp": randint(1, 1000),
                                   "Attack": randint(1, 1000),
                                   "Defense": randint(1, 1000),
                                   "SpAtk": randint(1, 1000),
                                   "SpDef": randint(1, 1000),
                                   "Speed": randint(1, 1000),
                                   "Generation": randint(1, 1000),
                                   "Legendary": 'true'
                               },
                               headers=authorization_headers,
                               catch_response=True) as response:
            responseFormatter(response, context)


# setup Environment and Runner
env = Environment(user_classes=[User])
