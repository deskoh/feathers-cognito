
// Logger. (Can be re-generated.)
import { createLogger, format, transports } from 'winston';

// !code: imports // !end
// !code: init
const isProduction = process.env.NODE_ENV === 'production';
const productionLogLevel = process.env.LOGLEVEL || 'info';
// To see more detailed errors, change this to debug'
const LogLevel = 'verbose';

const errorStackFormat = format((info: any) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});
// !end

/**
 * Configure the Winston logger. For the complete documentation seee https://github.com/winstonjs/winston
 *
 * Level: {
 *  error: 0,
 *  warn: 1,
 *  info: 2,
 *  verbose: 3,
 *  debug: 4,
 *  silly: 5
 * }
 *
 * Default Console log level: [Production: Info], [!Production: verbose]
 *
 * Transport Overrides:
 *  File: info
 *
 * exceptionHandlers Default:
 *  File: error
 *
 * To log JSON object, use either:
 * logger.debug('Printing JSON object: %o', jsonObject);
 * logger.debug(`${JSON.stringfy(jsonObject)}`);
 */
const moduleExports = createLogger({
  // !code: level
  level: isProduction ? productionLogLevel : LogLevel,
  // !end
  // !code: format
  format: format.combine(
    // TODO: Add filename as label ([${log.label}])
    // format.label({
    //   label: path.basename(process && process.mainModule && process.mainModule.filename)
    // }),
    // errorStackFormat(),
    format.colorize({ level: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
    format.splat(),
    // format.printf(log => `[${log.timestamp}] [${log.level}]
    // ((${log.message.constructor === Object})?${JSON.stringify(log.message)}:${log.message}})`),
    format.printf(log => (log.stack
      ? `[${log.timestamp}] [${log.level}] ${log.message}\n${log.stack}`
      : `[${log.timestamp}] [${log.level}] ${log.message}`
    )),
  ),
  // !end
  // !code: transport
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
      consoleWarnLevels: ['warn', 'error'],
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
  // !end
  // !code: moduleExports // !end
});

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
