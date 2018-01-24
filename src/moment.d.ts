// see: https://github.com/moment/moment/issues/3763#issuecomment-306630482

declare var moment: any;
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
import * as _moment from 'moment';
export as namespace moment;
export = _moment;