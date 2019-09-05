const { override, addWebpackPlugin } = require('customize-cra')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

process.env.GENERATE_SOURCEMAP = 'false';

module.exports = override(
  addWebpackPlugin(
    new ProgressBarPlugin({
      complete: '█',
      format: `${chalk.green('Building')} [ ${chalk.green(
        ':bar'
      )} ] ':msg:' ${chalk.bold('(:percent)')}`,
      clear: true
    })
  )
)
