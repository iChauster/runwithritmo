console.log('log HELLO + ++ +')
const args = [ 'run ios' ];
const opts = { stdio: 'inherit', cwd: 'client/mobile', shell: true };
require('child_process').spawn('npm', args, opts);
