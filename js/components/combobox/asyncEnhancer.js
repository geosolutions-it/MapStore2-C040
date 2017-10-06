const {isArray} = require('lodash');
const {setObservableConfig, mapPropsStreamWithConfig, compose, withStateHandlers} = require('recompose');
const rxjsConfig = require('recompose/rxjsObservableConfig').default;
setObservableConfig(rxjsConfig);
const mapPropsStream = mapPropsStreamWithConfig(rxjsConfig);

const streamEnhancer = mapPropsStream(props$ => {
    let fetcherStream = props$.take(1).switchMap(p => {
        return p.autocompleteStreamFactory(props$);
    });
    return fetcherStream.combineLatest(props$, (data, props) => ({
        data: isArray(data && data.fetchedData && data.fetchedData.values) ? data.fetchedData.values.map(v => {
            return {label: v.DESVIA + " " + v.TESTO, value: v.CODICE_CONTROLLO};
        }) : [],
        select: props && props.select,
        focus: props && props.focus,
        toggle: props && props.toggle,
        change: props.change,
        open: props.open,
        itemComponent: props.itemComponent,
        selected: props && props.selected,
        value: props.value,
        busy: data.busy
    }));
});

const addStateHandlers = compose(
    withStateHandlers((props) => ({

        delayDebounce: 0,
        performFetch: false,
        open: false,
        currentPage: 1,
        maxFeatures: 5,
        url: props.url,
        typeName: props.typeName,
        value: props.value,
        itemComponent: props.itemComponent,
        valueField: props.valueField,
        attribute: props.column && props.column.key,
        autocompleteStreamFactory: props.autocompleteStreamFactory
    }), {
        select: (state) => (v) => ({
            ...state,
            defaultValue: typeof v === "string" ? v : v.value,
            selected: true
        }),
        change: (state) => (v) => {
            if (state.selected && state.changingPage) {
                return ({
                    ...state,
                    delayDebounce: state.selected ? 0 : 500,
                    selected: false,
                    changingPage: false,
                    performFetch: state.selected && !state.changingPage ? false : true,
                    value: state.value,
                    currentPage: !state.changingPage ? 1 : state.currentPage
                });
            }
            const value = typeof v === "string" ? v : v.value;
            return ({
                ...state,
                delayDebounce: state.selected ? 0 : 500,
                selected: false,
                changingPage: false,
                performFetch: state.selected && !state.changingPage ? false : true,
                value: value,
                currentPage: !state.changingPage ? 1 : state.currentPage
            });
        },
        focus: (state) => (options) => {
            if (options && options.length === 0 && state.value === "") {
                return ({
                    ...state,
                    delayDebounce: 0,
                    currentPage: 1,
                    performFetch: true,
                    isToggled: false,
                    open: true
                });
            }
            return (state);
        },
        toggle: (state) => () => ({
            ...state,
            open: state.changingPage ? true : !state.open
        })
    })
);


module.exports = {
    streamEnhancer,
    addStateHandlers
};
