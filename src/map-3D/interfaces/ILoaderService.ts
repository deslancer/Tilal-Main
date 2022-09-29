import type {AbstractAssetTask} from 'babylonjs';

export interface ILoaderService {
	addMainSceneTask(): void;

	addEnvTextureTask(): void;

	getMainSceneTask(): AbstractAssetTask | null;

	getEnvTextureTask(): AbstractAssetTask | null;

	loadAll(): void;
}
