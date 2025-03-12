import FuzzySearch from 'fuzzy-search';
import Fuse from 'fuse.js';
import { data, options, test } from './data.js';

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

class FuseIndex extends Index {
    constructor() {
        super();
        this.index = new Fuse(data, {
            keys: ['name'],
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

run('fuzzy', new FuzzyIndex());
run('fuse', new FuseIndex());
