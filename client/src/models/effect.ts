import { ObjectId } from 'mongodb';

export default class EffectTableItem {
	constructor(public name: string, public description: string, public id?: ObjectId) {}
}
