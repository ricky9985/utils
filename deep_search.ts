import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchInList',
})
export class SearchInList implements PipeTransform {

    transform(items: any[], searchOb: { keys: Array<string>, searchText: string }) {
        let deepVal;
        let properties;
        let status;
        if (!items) return [];
        if (!searchOb.searchText) return items;
        searchOb.searchText = searchOb.searchText.toLowerCase();
        return items.filter(item => {
            status = false;
            searchOb.keys.forEach(key => {
                properties = key.split('.');
                deepVal = properties.reduce((value, property) => {
                    if (value.hasOwnProperty(property)) {
                        return value[property];
                    } else {
                        return value;
                    }
                }, item);
                if (typeof deepVal !== "object") {
                    if (!status) {
                        status = deepVal.toLowerCase().includes(searchOb.searchText);
                    }
                }
            });
            return status;
        });
    }
}