import { hasAnyRoles } from "util/auth";
import * as TokenModule from '../token'

describe('hasAnyRoles tests', () => {

    test('should return true when empty list', () => {

        const result = hasAnyRoles([])
        expect(result).toEqual(true);
    });

    test('should return true when user has role', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: '',
            authorities: ['ROLE_ADMIN', 'ROLE_ADMIN'],
        });

        const result = hasAnyRoles(['ROLE_ADMIN'])
        expect(result).toEqual(true);
    });

});