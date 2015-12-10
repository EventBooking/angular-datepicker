module Arrays {

    export interface IGroup<T> {
        [index: string]: T[];
        [index: number]: T[];
    }

    export class ArrayUtils {
        static groupBy<T>(array: T[], getKey: (value: T) => string|number): IGroup<T> {
            var group: IGroup<T> = {};
            array.forEach(x => {
                var key = getKey(x);
                if (!group[key])
                    group[key] = [];
                group[key].push(x);
            });
            return group;
        }

        static ungroup<T>(array: IGroup<T>): T[] {
            var items: T[] = new Array<T>();
            for (var name in array)
                if (array.hasOwnProperty(name))
                    items = items.concat(array[name]);
            return items;
        }

        static mapMany<T, TU>(array: T[], map: (value: T, index: number, array: T[]) => TU[]) {
            return array.map(map).reduce((a, b) => a.concat(b));
        }

        static firstOrDefault<T>(array: T[], where: (value: T) => boolean) {
            var result = array.filter(x => where(x));
            if (result.length > 0)
                return result[0];
            return null;
        }

        static remove<T>(array: T[], item: T): boolean {
            var index = array.indexOf(item);
            if (index < 0)
                return false;
            array.splice(index, 1);
            return true;
        }

        static contains<T>(array: T[], predicate: (value: T) => boolean): boolean {
            for (var i = 0; i < array.length; i++) {
                var value = array[i];
                if (predicate(value))
                    return true;
            }
            return false;
        }
    }
}