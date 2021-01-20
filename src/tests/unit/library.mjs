/*
**
** Custom Unit Testing Toolbox
**
*/

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const assert = require('assert').strict;
const chalk = require('chalk')

class CustomUnitTestsKit{

    message_block_sig_handle  = '-'
    message_block_line_handle = '>'

    constructor(name="undefined"){
        
        console.log('\n\n')
        console.log("********************************");
        console.log("**                            **");
        console.log(`**          Testing           **`);
        console.log("**                            **");
        console.log("********************************");
        console.log(`  Test Name : ${name}`);
        console.log("********************************")
        console.log('\n\n')


    }

    assert_e(actual, expected, message=null){

        console.log('\n\n')
        
        process.stdout.write(chalk.yellow('[Assertion]\n'))
        this.message_separator()

        let data = []
        data.push(
            chalk.yellow('Asserting Strictly Equal') 
            + '   ' 
            + `${actual} ?=== ${expected}`)
        data.push(assert.strictEqual(actual, expected, message))

        this.message_block(data)
    
        this.message_separator()

    }

    message_block(lines){


        // > ...
        // > ...
        // > ...
        lines.forEach((line) => {

            if (line === undefined){
                line = chalk.green('OK')
            }

            process.stdout.write(
                this.message_block_line_handle
                + '  '
                + line
                + '\n'
            );
        })

    }

    // > > > > >
    message_separator(){
        
        let i = 0;
        
        for (i = 0; i < 10; i++)
        {
            process.stdout.write(this.message_block_line_handle + ' ')
        }
        process.stdout.write('\n');
    }

}

export default{
    CustomUnitTestsKit
}