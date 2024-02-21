import { MRT_ColumnDef, MRT_TableOptions } from 'material-react-table';
import { AnimationStateT } from './animation.types';

export type PlaylistTablePropsT = Partial<MRT_TableOptions<AnimationStateT>>;
export type PlaylistColumnsT = MRT_ColumnDef<AnimationStateT>[];
