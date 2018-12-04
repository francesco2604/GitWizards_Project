const request = require('supertest');
const server = require('../app.js');

// describe all tests for user endpoint
describe('## API users TEST', () => {
    describe('POST /v1/taskgroup/ - create a taskgroup ', () => {
      // variables used as test cases
      var good_header = {
          'Content-Type': 'application/json',
          'user_id': 1
      };
      var bad_header = {
          'Content-Type': 'application/json',
          'user_id': 2
      };
      // tests
      test('it should return a successfull creation', async () => {
          var response = await request(server).post('/v1/taskgroup/').set(good_header).send({"description":"Domande per il testing"});
          expect(response).not.toBeNull();
          expect(response.body).toBeDefined();
          expect(response.body).not.toBeNull();
          expect(response.get('content-type')).toBeDefined();
          expect(response.get('content-type')).not.toBeNull();
          expect(response.get('content-type')).toContain('application/json');
          expect(response.status).toBeDefined();
          expect(response.status).toBe(201);

          // adesso faccio una get sulla risorsa appena creata e vedo se esiste
          idnew = response.body.id;
          uri = '/v1/taskgroup/'+idnew;
          var response2 = await request(server).get(uri).set(good_header);
          expect(response2).not.toBeNull();
          expect(response2.body).toBeDefined();
          expect(response2.body).not.toBeNull();
          expect(response2.get('content-type')).toBeDefined();
          expect(response2.get('content-type')).not.toBeNull();
          expect(response2.get('content-type')).toContain('application/json');
          expect(response2.status).toBeDefined();
          expect(response2.status).toBe(200);


          // controllo il formato della risposta se è corretto
          var body_keys = ['id','description']
          expect(typeof response.body).toEqual('object');
          expect(response.body).toBeDefined();
          expect(response.body).not.toBeNull();
          expect(Object.keys(response.body).sort()).toEqual(body_keys.sort());
          expect(typeof response.body.id).toEqual('number');
          expect(typeof response.body.description).toEqual('string');
          expect(response.body.id).not.toBeNull();
          expect(response.body.id).toBeDefined();
          expect(response.body.description).toBeDefined();
          expect(response.body.description).not.toBeNull();

          expect.assertions(26);
          return;
      });
      test('it should return a permission denied error', async () => {
          var response = await request(server).post('/v1/taskgroup/').set(bad_header).send({"description":"Domande per il testing"});
          expect(response).not.toBeNull();
          expect(response.headers).toBeDefined();
          expect(response.headers).not.toBeNull();
          expect(response.get('content-type')).toBeDefined();
          expect(response.get('content-type')).not.toBeNull();
          expect(response.get('content-type')).toContain('application/json');
          expect(response.status).toBeDefined();
          expect(response.status).toBe(403);

          // controllo il formato della risposta se è corretto
          var body_keys = ['codice','messaggio']
          expect(typeof response.body).toEqual('object');
          expect(response.body).toBeDefined();
          expect(response.body).not.toBeNull();
          expect(Object.keys(response.body).sort()).toEqual(body_keys.sort());
          expect(typeof response.body.codice).toEqual('number');
          expect(typeof response.body.messaggio).toEqual('string');
          expect(response.body.codice).not.toBeNull();
          expect(response.body.codice).toBeDefined();
          expect(response.body.messaggio).toBeDefined();
          expect(response.body.messaggio).not.toBeNull();
          expect(response.body.codice).toBe(403);

          expect.assertions(19);
          return;
      });
      test('it should return a bad format error', async () => {
          var response = await request(server).post('/v1/taskgroup/').set(good_header);
          expect(response).not.toBeNull();
          expect(response.headers).toBeDefined();
          expect(response.headers).not.toBeNull();
          expect(response.get('content-type')).toBeDefined();
          expect(response.get('content-type')).not.toBeNull();
          expect(response.get('content-type')).toContain('application/json');
          expect(response.status).toBeDefined();
          expect(response.status).toBe(400);

          // controllo il formato della risposta se è corretto
          var body_keys = ['codice','messaggio']
          expect(typeof response.body).toEqual('object');
          expect(response.body).toBeDefined();
          expect(response.body).not.toBeNull();
          expect(Object.keys(response.body).sort()).toEqual(body_keys.sort());
          expect(typeof response.body.codice).toEqual('number');
          expect(typeof response.body.messaggio).toEqual('string');
          expect(response.body.codice).not.toBeNull();
          expect(response.body.codice).toBeDefined();
          expect(response.body.messaggio).toBeDefined();
          expect(response.body.messaggio).not.toBeNull();
          expect(response.body.codice).toBe(400);

          expect.assertions(19);
          return;
      });
    });
    // test sulla richiesta DELETE
    describe('DELETE /v1/taskgroup/:id - delete a specified taskgroup ', () => {
        // variables used as test cases
        var good_header = {
            'Content-Type': 'application/json',
            'user_id': 1
        };
        var bad_header = {
            'Content-Type': 'application/json',
            'user_id': 2
        };

        // tests
        test('it should return a successfull deletion', async () => {
            var response = await request(server).delete('/v1/taskgroup/1').set(good_header);
            expect(response).not.toBeNull();
            expect(response.headers).toBeDefined();
            expect(response.headers).not.toBeNull();
            expect(response.status).toBeDefined();
            expect(response.status).toBe(204);

            // ora testo che la risorsa sia stata veramente eliminata con una richiesta GET
            var response2 = await request(server).get('/v1/taskgroup/1').set(good_header);
            expect(response2).not.toBeNull();
            expect(response2.body).toBeDefined();
            expect(response2.body).not.toBeNull();
            expect(response2.get('content-type')).toBeDefined();
            expect(response2.get('content-type')).not.toBeNull();
            expect(response2.get('content-type')).toContain('application/json');
            expect(response2.status).toBeDefined();
            expect(response2.status).toBe(404);

            // controllo il formato della risposta se è corretto
            var body_keys = ['codice','messaggio']
            expect(typeof response.body).toEqual('object');
            expect(response2.body).toBeDefined();
            expect(response2.body).not.toBeNull();
            expect(Object.keys(response2.body).sort()).toEqual(body_keys.sort());
            expect(typeof response2.body.codice).toEqual('number');
            expect(typeof response2.body.messaggio).toEqual('string');
            expect(response2.body.codice).not.toBeNull();
            expect(response2.body.codice).toBeDefined();
            expect(response2.body.messaggio).toBeDefined();
            expect(response2.body.messaggio).not.toBeNull();
            expect(response2.body.codice).toBe(404);

            expect.assertions(24);
            return;
        });
        test('it should return a permission denied error', async () => {
            var response = await request(server).delete('/v1/taskgroup/1').set(bad_header);
            expect(response).not.toBeNull();
            expect(response.headers).toBeDefined();
            expect(response.headers).not.toBeNull();
            expect(response.status).toBeDefined();
            expect(response.status).toBe(403);

            // controllo il formato della risposta se è corretto
            var body_keys = ['codice','messaggio']
            expect(typeof response.body).toEqual('object');
            expect(response.body).toBeDefined();
            expect(response.body).not.toBeNull();
            expect(Object.keys(response.body).sort()).toEqual(body_keys.sort());
            expect(typeof response.body.codice).toEqual('number');
            expect(typeof response.body.messaggio).toEqual('string');
            expect(response.body.codice).not.toBeNull();
            expect(response.body.codice).toBeDefined();
            expect(response.body.messaggio).toBeDefined();
            expect(response.body.messaggio).not.toBeNull();
            expect(response.body.codice).toBe(403);

            expect.assertions(16);
            return;
        });
        test('it should return a not found error', async () => {
            var response = await request(server).delete('/v1/taskgroup/1').set(good_header);
            expect(response).not.toBeNull();
            expect(response.headers).toBeDefined();
            expect(response.headers).not.toBeNull();
            expect(response.status).toBeDefined();
            expect(response.status).toBe(404);

            // controllo il formato della risposta se è corretto
            var body_keys = ['codice','messaggio']
            expect(typeof response.body).toEqual('object');
            expect(response.body).toBeDefined();
            expect(response.body).not.toBeNull();
            expect(Object.keys(response.body).sort()).toEqual(body_keys.sort());
            expect(typeof response.body.codice).toEqual('number');
            expect(typeof response.body.messaggio).toEqual('string');
            expect(response.body.codice).not.toBeNull();
            expect(response.body.codice).toBeDefined();
            expect(response.body.messaggio).toBeDefined();
            expect(response.body.messaggio).not.toBeNull();
            expect(response.body.codice).toBe(404);

            expect.assertions(16);
            return;
        });
    });
});

// close the server after the test
afterAll(() => {
    server.close();
});
