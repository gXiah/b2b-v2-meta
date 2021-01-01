# B2bBoxV2Workspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Adding a new library

Generate a new library
```workspace/ $ ng generate library lib-name --prefix cleed```

Then modify the following files like so :
- ```package.json``` located in ```workspace/projects/my-lib``` : modify the ```name``` to ```@cleed/my-lib```
- ```tsconfig.json``` located in ```workspace/``` : replace the part of the ```paths``` key linked to the current library by the following 
```
"paths": {
	
	(...)

	"@cleed/my-lib/*": [
		"projects/my-lib/*",
		"projects/my-lib"
	],
	"@cleed/my-lib": [
		"dist/my-lib/*",
		"dist/my-lib"
	]

	(...)
}
```
- Delete the contents of the folder ```lib``` located at ```workspace/projects/my-lib/src``` and delete the content of the file ```public-api.ts``` located in the same folder

===

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
