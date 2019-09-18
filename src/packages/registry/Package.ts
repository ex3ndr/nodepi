import { declarePackage } from './declarePackage';
import { RegistryResolver } from './Resolver';

export default declarePackage('package-manager', __dirname + '/Schema.graphql', RegistryResolver);