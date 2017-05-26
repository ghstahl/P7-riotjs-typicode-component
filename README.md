# P7-riotjs-typicode-component

A riotjs applet that relys on the [P7-riotjs-host](https://github.com/ghstahl/P7-riotjs-host) project to host it.
 
* [live Demo](https://ghstahl.github.io/riot1/)

## Features 

Its a plugin, because the plugin has to obey some rules of the host and not carry code that that host provides.

In this example, you will notice the plugin bundle.js does not contain riot, bootstrap, or jquery amongst other libraries that are already present in the host app.  Its quite small, and the child plugin considers itself autonomous.
```
externals: {
    $: 'jQuery',
    jquery: 'jQuery',
    riot: 'riot'
  }
```

## Housekeeping 
A starter riotjs project based upon the following;
* [Webpack 2](http://webpack.github.io/)

## Get the component

```
$ git clone https://github.com/ghstahl/P7-riotjs-typicode-component.git && cd P7-riotjs-typicode-component
```

## Installation

```
$ npm install
```

## Development

```
$ npm run dev
```



