import { fetchConToken, fetchSinToken } from '../../helpers/fetch';


describe('Pruebas en el helper Fetch', () => {
    
    let token = '';

    test('fetchSinToken debe de funcionar', async() => {
        
        const resp = await fetchSinToken('auth',  {email: 'example@example.com', password: '123456'}, 'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();

        expect(body.ok).toBe(true);

        token =body.token;
        
    });



    test('fetchConToken debe de funcionar', async() => {
        
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/delete/62840a834bb979e7862109b7', {}, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe('El evento no existe');

    });

});