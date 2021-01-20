/*
**
** Testing Grounds for Store module 'Session'
**
*/

import  CustomUnitTestsKit from '../library.mjs';

const TestKit = new CustomUnitTestsKit.CustomUnitTestsKit('session');

TestKit.assert_e(1, 1, 'message')
TestKit.assert_e(1, 2, 'message')