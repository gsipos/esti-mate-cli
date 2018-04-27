import { Estimate } from "../../model";

type EstimateSeparator = ',' | ' ';

function splitToTokens(estimateString: string, separator: EstimateSeparator): string[] | undefined {
    const commaSeparatedTokens = estimateString.split(separator).map(s => s.trim());
    if (commaSeparatedTokens.length === 3) {
        return commaSeparatedTokens;
    } else if (commaSeparatedTokens.length > 1) {
        throw new Error(`There should be 3 values, and there are ${commaSeparatedTokens.length} currently!`);
    }

}

const indexToName: { [index: number]: string } = {
    0: 'Worst case',
    1: 'Most likely',
    2: 'Best case'
};

function parseToken(token: string, index: number) {
    const value = Number.parseFloat(token);
    if (Number.isNaN(value)) {
        throw new Error(`${indexToName[index]} doesn't look like a number!`);
    }
    return value;
}

export function parseEstimateString(estimateString: string): Estimate {
    if (!estimateString || estimateString.length === 0) {
        throw new Error('Please provide 3 values for estimation!');
    }
    const tokens = splitToTokens(estimateString, ',') || splitToTokens(estimateString, ' ') || [];
    if (tokens.length !== 3) {
        throw new Error("Please provide 3 values for estimation!");
    }

    const values = tokens.map((v, idx) => parseToken(v, idx));

    return {
        worstCase: values[0],
        mostLikely: values[1],
        bestCase: values[2],
    };
}

export function validateEstimateString(estimateString: string): boolean | string {
    try {
        parseEstimateString(estimateString);
        return true;
    } catch (error) {
        return error.message;
    }
}