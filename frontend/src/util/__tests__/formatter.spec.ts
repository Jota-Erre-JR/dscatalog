import { formatPrice } from "util/formatter";


describe('formatPrice for positive numbers', () => {

    test('formatPrice should format number pt-BR when given 10.1', () => {

        //ARRANGE
        const value = 10.1;

        //ACT
        const result = formatPrice(value);

        //ASSERT
        expect(result).toEqual("10,10");
    });

    test('formatPrice should format number pt-BR when given 5.1', () => {

        const value = 5.1;

        const result = formatPrice(value);

        expect(result).toEqual("5,10");
    });

});

describe('formatPrice for non-positive numbers', () => {

    test('formatPrice should format number pt-BR when given 0.0', () => {

        const value = 0.0;

        const result = formatPrice(value);

        expect(result).toEqual("0,00");
    });

    test('formatPrice should format number pt-BR when given -5.1', () => {

        const value = -5.1;

        const result = formatPrice(value);

        expect(result).toEqual("-5,10");
    });

});
