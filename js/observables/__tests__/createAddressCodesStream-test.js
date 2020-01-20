/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
import expect from 'expect';
import {fromTextToFilter} from '../createAddressCodesStream';
const blacklist = ["via", "viale", "piazza"];
const predicate = "ILIKE";
const staticFilter = "";
const queriableAttributes = ["DESVIA"];
const item = {};
const defaultOptions = {predicate, blacklist, staticFilter, queriableAttributes, item};

describe('Testing the observable functions', () => {
    describe('fromTextToFilter', () => {
        it('Testing only blacklisted text: via, viale, piazza', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "via"
            })).toBe("( DESVIA ILIKE '%via%')");
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "viale"
            })).toBe("( DESVIA ILIKE '%viale%')");
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "piazza"
            })).toBe("( DESVIA ILIKE '%piazza%')");
        });
        it('text: via andreotti', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "via andreotti"
            })).toBe("( DESVIA ILIKE '%andreotti%')");
        });
        it('text: piazza andreotti', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "via andreotti"
            })).toBe("( DESVIA ILIKE '%andreotti%')");
        });
        it('text: viale andreotti', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "via andreotti"
            })).toBe("( DESVIA ILIKE '%andreotti%')");
        });
        it('text: marino 184', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "marino 184"
            })).toBe("( DESVIA ILIKE '%marino%' AND TESTO ILIKE '%184%')");
        });
        it('text: galleria mazz', () => {
            expect(fromTextToFilter({
                ...defaultOptions,
                searchText: "galleria mazz"
            })).toBe("( DESVIA ILIKE '%galleria%' AND DESVIA ILIKE '%mazz%')");
        });
    });
});
