import { formatPrice } from "util/formatter";

test('formatPrice should format number pt-BR when given 10.1', () => {

    //ARRANGE
    const value = 10.1;

    //ACT
    const result = formatPrice(value);

    //ASSERT
    expect(result).toEqual("10,10");
});