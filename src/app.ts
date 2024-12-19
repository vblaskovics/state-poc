import AppManager from './core/appManager';
import { ConsoleTerminal } from './core/consoleTerminal';
import { EndState } from './states/end.state';
import { StartState } from './states/start.state';

const terminal = new ConsoleTerminal();
const app = new AppManager(terminal);
app.setCurrentState(new StartState(app));

await app.runUntilState(EndState);

process.exit();
