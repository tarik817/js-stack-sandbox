import { DotenvConfigOptions } from 'dotenv';
import path from 'path';
const dotEnvConfig: DotenvConfigOptions = {
    path: path.resolve(process.cwd(), '../','.env')
};

exports.setupOptions = () => {
    require('dotenv').config(dotEnvConfig);
};