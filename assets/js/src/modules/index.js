import addNumber from './addNumber';

const pageFunctions = {
    common: {
        init() {
            addNumber(1,2);
        },

        finalize() {
        }
    }
};

const executePageFunctions = (finalize = false) => {
    const body = document.body;

    if (finalize) {
        pageFunctions.common.finalize();
    }

    else {
        pageFunctions.common.init();
    }
    for (let bodyClass of body.classList) {
        bodyClass = bodyClass.replace(/-/g, '_');
        if (finalize) {
            if (typeof pageFunctions[bodyClass] !== 'undefined') {
                if (typeof pageFunctions[bodyClass].finalize !== 'undefined') {
                    pageFunctions[bodyClass].finalize();
                }
            }
        }
        else {
            if (typeof pageFunctions[bodyClass] !== 'undefined') {
                if (typeof pageFunctions[bodyClass].init !== 'undefined') {
                    pageFunctions[bodyClass].init();
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    executePageFunctions(true);
});

executePageFunctions();
