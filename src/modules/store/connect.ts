import { TComponentProps, TIndexed, TStore } from '../types';
import { Block } from '../Block/Block';
import { store, StoreEvents } from './store';


export const connect = (Component: typeof Block, mapStateToProps: (state: TStore) => TIndexed) =>
   class extends Component {
     constructor(props: TComponentProps) {
       super({ ...props, ...mapStateToProps(store.getState()) });

       store.on(StoreEvents.Updated, () => {
         this.setProps({ ...mapStateToProps(store.getState()) });
       });
     }
  };
