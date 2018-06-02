import { addMenuSeparator } from "./utils";

describe('Menu utils', () => {
    console.log = jest.fn();

    it('addMenuSeparator add some whitespace', () => {
        addMenuSeparator();
        expect(console.log).toHaveBeenCalled();
    });

});