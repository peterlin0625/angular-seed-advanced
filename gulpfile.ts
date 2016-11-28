import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as runSequence from 'run-sequence';

import Config from './tools/config';
import { loadTasks } from './tools/utils';


loadTasks(Config.SEED_TASKS_DIR);
loadTasks(Config.PROJECT_TASKS_DIR);


// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence('clean.once',
//              'tslint',
              'build.assets.dev',
              'build.html_css',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', (done: any) =>
  runSequence('clean.e2e',
              'tslint',
              'build.js.e2e',
              done));

// --------------
// Build prod.
gulp.task('build.prod', (done: any) =>
  runSequence('check.tools',
              'clean.prod',
              'tslint',
              'build.assets.prod',
              'build.html_css',
              'copy.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'minify.bundles',
              'build.index.prod',
              done));

// --------------
// Build prod.
gulp.task('build.prod.exp', (done: any) =>
  runSequence('check.tools',
              'clean.prod',
              'tslint',
              'build.assets.prod',
              'build.html_css',
              'copy.prod',
              'compile.ahead.prod',
              'build.js.prod.exp',
              'build.bundles',
              'build.bundles.app.exp',
              'minify.bundles',
              'build.index.prod',
              done));

// --------------
// Build test.
gulp.task('build.test', (done: any) =>
  runSequence('clean.once',
//              'tslint',
              'build.assets.dev',
              'build.html_css',
              'build.js.dev',
              'build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('test.watch', (done: any) =>
  runSequence('build.test',
              'watch.test',
              'karma.watch',
              done));

// --------------
// Build test watch.
gulp.task('build.tns', (done: any) =>
  runSequence(//'clean.tns',
//              'tslint',
              'build.assets.tns',
              'build.tns_html_css',
              'build.js.tns',
              done));

// --------------
// Build dev watch.
gulp.task('build.tns.watch', (done: any) =>
  runSequence('build.tns',
              'watch.tns',
              done));

// --------------
// Docs
gulp.task('docs', (done: any) =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', (done: any) =>
  runSequence(
              'tslint',
              'build.dev',
              'build.js.e2e',
              'server.start',
              'watch.dev',
              'watch.e2e',
              done));


// --------------
// Serve prod
gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod',
              'server.prod',
              done));


// --------------
// Serve prod exp
gulp.task('serve.prod.exp', (done: any) =>
  runSequence('build.prod.exp',
              'server.prod',
              done));

// --------------
// Test.
gulp.task('test', (done: any) =>
  runSequence('build.test',
              'karma.run',
              done));

// Desktop (Electron)

// Development
gulp.task('desktop', (done: any) =>
  runSequence('build.dev',
              'desktop.libs',
              'desktop.build',
              done));

// Release and Package

// TODO: integrate prod build into electron package
// gulp.task('desktop.prod', (done: any) =>
//   runSequence('build.prod',
//               'desktop.libs',
//               'desktop.build',
//               done));

gulp.task('desktop.mac', (done: any) =>
  runSequence('desktop',
              'desktop.package.mac',
              done));

gulp.task('desktop.windows', (done: any) =>
  runSequence('desktop',
              'desktop.package.windows',
              done));

gulp.task('desktop.linux', (done: any) =>
  runSequence('desktop',
              'desktop.package.linux',
              done));

// --------------
// Clean directories after i18n
// TODO: find a better way to do it
gulp.task('clean.i18n', (done: any) =>
  runSequence('clear.files',
              done));

// --------------
// Clean directories after i18n
// TODO: find a better way to do it
gulp.task('clean.i18n', (done: any) =>
  runSequence('clear.files',
              done));

// --------------
// Clean dev/coverage that will only run once
// this prevents karma watchers from being broken when directories are deleted
let firstRun = true;
gulp.task('clean.once', (done: any) => {
  if (firstRun) {
    firstRun = false;
    runSequence('check.tools', 'clean.dev', 'clean.coverage', done);
  } else {
    util.log('Skipping clean on rebuild');
    done();
  }
});

