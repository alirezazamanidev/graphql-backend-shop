
import {config as dotEnvConfig} from 'dotenv';
import { join } from 'path';


dotEnvConfig()
dotEnvConfig({
    path:join(process.cwd(), `.env`)
})
