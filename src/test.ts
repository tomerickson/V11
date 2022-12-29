// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import 'zone.js/testing';
import 'zone.js/dist/async-test.js'
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);
