import FuzzySearch from 'fuzzy-search';
import lunr from 'lunr';
import { data, test } from './data.js';
import e from 'express';

class Index {
    search(word) {
        return this.index.search(word);
    }
}

class FuzzyIndex extends Index {
    constructor() {
        super();
        this.index = new FuzzySearch(data, ['name'], {
            caseSensitive: false,
        });
    }
}

class LunrIndex extends Index {
    constructor() {
        super();
        this.index = lunr(function () {
            this.ref('id');
            this.field('name');
            for (const item of data) {
                this.add(item);
            }
        });
    }
}

const run = (it, index) => {
    console.warn(it);
    for (const word of test) {
        const result = index.search(word);
        console.log(word, result);
    }
};

// run('fuzzy', new FuzzyIndex());
run('lunr', new LunrIndex());
