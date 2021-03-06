    /*! Rappid v2.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

    Copyright (c) 2015 client IO

     2017-02-01 


    This Source Code Form is subject to the terms of the Rappid Trial License
    , v. 2.0. If a copy of the Rappid License was not distributed with this
    file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
     or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

     var initial = 0;  

    var App = window.App || {};

    (function(joint, _, window) {

        var COLORS = ['#31d0c6', '#7c68fc', '#fe854f', '#feb663'];
        var DIRECTIONS = ['R', 'BR', 'B', 'BL', 'L', 'TL', 'T', 'TR'];
        var POSITIONS = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];


        joint.setTheme('material');

        var graph = new joint.dia.Graph;
        var tree = new joint.layout.TreeLayout({ graph: graph });

        

        var paper = new joint.dia.Paper({
            width: $('#paperdiv').width(),
            height: $('#paperdiv').height(),
            gridSize: 10,
            model: graph,
            perpendicularLinks: true,
            interactive: true
        });

        var paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            cursor: 'grab',
            baseWidth: 1,
            baseHeight: 1,
            contentOptions: {
                padding: 100,
                allowNewOrigin: 'any'
            }
        });

        var commandManager = new joint.dia.CommandManager({
            graph: graph
        });

        paper.on({
            'element:pointerdown': onElementClick,
            'blank:pointerdown': paperScroller.startPanning
        });

        paperScroller.render().$el.appendTo('#paperdiv');

        var toolbar = new joint.ui.Toolbar({
            tools: ['undo', 'redo'],
            references: {
                paperScroller: paperScroller,
                commandManager: commandManager
            }
        });

    toolbar.render().$el.appendTo('#toolbardiv');

        var stencil = new joint.ui.Stencil({

            paper: paperScroller,
            width: 240
        });

        //CRIACAO DO DIAMOND
        var diamond = new joint.shapes.devs.Model({
            size: { width: 100, height: 100 },
            attrs: {
                path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
            },
            position: {
                x: initial + 50,
                y: initial + 20
            },
            inPorts: ['a','b', 'c'],
            outPorts: ['d','e']
        });


        //CRIACAO DE UMA IMAGEM SVG COMO MODEL
       var svgFile = [
       '<?xml version="1.0" standalone="no"?>',
       '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M28.1,36.6c4.6,1.9,12.2,1.6,20.9,1.1c8.9-0.4,19-0.9,28.9,0.9c6.3,1.2,11.9,3.1,16.8,6c-1.5-12.2-7.9-23.7-18.6-31.3 c-4.9-0.2-9.9,0.3-14.8,1.4C47.8,17.9,36.2,25.6,28.1,36.6z"/><path d="M70.3,9.8C57.5,3.4,42.8,3.6,30.5,9.5c-3,6-8.4,19.6-5.3,24.9c8.6-11.7,20.9-19.8,35.2-23.1C63.7,10.5,67,10,70.3,9.8z"/><path d="M16.5,51.3c0.6-1.7,1.2-3.4,2-5.1c-3.8-3.4-7.5-7-11-10.8c-2.1,6.1-2.8,12.5-2.3,18.7C9.6,51.1,13.4,50.2,16.5,51.3z"/><path d="M9,31.6c3.5,3.9,7.2,7.6,11.1,11.1c0.8-1.6,1.7-3.1,2.6-4.6c0.1-0.2,0.3-0.4,0.4-0.6c-2.9-3.3-3.1-9.2-0.6-17.6   c0.8-2.7,1.8-5.3,2.7-7.4c-5.2,3.4-9.8,8-13.3,13.7C10.8,27.9,9.8,29.7,9,31.6z"/><path d="M15.4,54.7c-2.6-1-6.1,0.7-9.7,3.4c1.2,6.6,3.9,13,8,18.5C13,69.3,13.5,61.8,15.4,54.7z"/><path d="M39.8,57.6C54.3,66.7,70,73,86.5,76.4c0.6-0.8,1.1-1.6,1.7-2.5c4.8-7.7,7-16.3,6.8-24.8c-13.8-9.3-31.3-8.4-45.8-7.7   c-9.5,0.5-17.8,0.9-23.2-1.7c-0.1,0.1-0.2,0.3-0.3,0.4c-1,1.7-2,3.4-2.9,5.1C28.2,49.7,33.8,53.9,39.8,57.6z"/><path d="M26.2,88.2c3.3,2,6.7,3.6,10.2,4.7c-3.5-6.2-6.3-12.6-8.8-18.5c-3.1-7.2-5.8-13.5-9-17.2c-1.9,8-2,16.4-0.3,24.7   C20.6,84.2,23.2,86.3,26.2,88.2z"/><path d="M30.9,73c2.9,6.8,6.1,14.4,10.5,21.2c15.6,3,32-2.3,42.6-14.6C67.7,76,52.2,69.6,37.9,60.7C32,57,26.5,53,21.3,48.6   c-0.6,1.5-1.2,3-1.7,4.6C24.1,57.1,27.3,64.5,30.9,73z"/></g></svg>'
       ].join('');

        var el1 = new joint.shapes.devs.Model({
          markup: '<g class="rotatable"><g class="scalable"><image class="body"/></g><g class="inPorts"/><g class="outPorts"/></g>',
          size: {
            width: 100,
            height: 100
          },
          position: {
            x: initial + 50,
            y: initial + 150
          },
          attrs: {
            '.body': {
              width: 1024,
              height: 768,
              'xlink:href': 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile),
              preserveAspectRatio: 'none'
            }
          },
          inPorts: ['a','b', 'c'],
          outPorts: ['d','e']
            });

        stencil.render().$el.appendTo('#stencildiv');
        stencil.render().load([diamond, el1]);

       var rec1 = new graph.rect(50, 50, 100, 100);
       rec.addTo(graph);

        var link = new joint.dia.Link({
            markup: '<path class="connection" stroke="#6a6c8a" stroke-width="2" d="M 0 0 0 0" pointer-events="none"/>',
            connector: { name: 'rounded' }
        });

        showHalo(element.clone().position(250, 250).addTo(graph).findView(paper));

        // Demo functions
        function layout() {
            tree.layout();
            paperScroller.adjustPaper();
        }

        function showHalo(view, opt) {

            var model = view.model;

            if (opt && opt.animation) {
                paperScroller.scrollToElement(model, opt);
            } else {
                paperScroller.centerElement(model);
            }

            var halo = new joint.ui.Halo({
                cellView: view,
                tinyThreshold: 0,
                boxContent: getBoxContent(model),
                handles: _.times(DIRECTIONS.length, function(i) {
                    return {
                        name: DIRECTIONS[i],
                        position: POSITIONS[i],
                        // Rotate the icon inside the handle based on the position
                        attrs: {
                            '.handle': {
                                style: 'transform: rotate(' + (i * 45) + 'deg); background-image: url("images/handle.png")'
                            }
                        }
                    };
                })
            });

            // Listen to all halo events and
            // try to parse the direction from the event name.
            halo.on('all', function(eventName) {
                var match = /\:(\w+)\:pointerdown/.exec(eventName);
                var direction = match && match[1];
                if (direction) {
                    addElement(model, direction);
                    halo.options.boxContent = getBoxContent(model);
                    halo.update();
                    layout();
                    paperScroller.centerElement(model);
                }
            });

            halo.render();
        }

        function getBoxContent(model) {

            var content = '<li>Add new element to an arbitrary side.</li>';

            if (graph.isSource(model)) {
                content += '<li>Double-click to <b>generate</b> a tree.</li>';
            } else if (graph.isSink(model)) {
                content += '<li>Double-click to <b>remove</b> the element.</li>';
            }

            return '<ul>' + content + '</ul>';
        }

        var clickTimerId;

        function onElementClick(view) {

            if (clickTimerId) {
                // double click
                window.clearTimeout(clickTimerId);
                clickTimerId = null;
                onElementDblClick(view);

            } else {
                // single click
                clickTimerId = window.setTimeout(click, 200);
            }

            function click() {
                clickTimerId = null;
                showHalo(view, { animation: true });
            }
        }

        function onElementDblClick(view) {

            var element = view.model;
            if (element.isElement()) {
                if (graph.isSource(element)) {
                    generateTree(element, { n: 4, depth: 3, directions: ['T', 'B', 'R', 'L'] });
                    layout();
                } else if (graph.isSink(element)) {
                    element.remove();
                    layout();
                }
            }
        }

        function addElement(element, direction) {

            var color = COLORS[_.random(0, COLORS.length - 1)];

            var newElement = element.clone()
                    .set('direction', direction)
                    .attr('rect/fill', color)
                    .addTo(graph);

            link.clone().set({
                source: { id: element.id },
                target: { id: newElement.id }
            }).addTo(graph);

            return newElement;
        }

        function generateTree(element, opt) {

            opt = opt || {};

            var n = opt.n || 0;
            var depth = opt.depth || 0;
            var directions = opt.directions || DIRECTIONS;

            _.times(n, function() {
                var direction = directions[_.random(0, directions.length - 1)];
                var newElement = addElement(element, direction);
                if (depth > 0) {
                    generateTree(newElement, {
                        n: n / 2,
                        depth: depth-1,
                        directions: directions
                    });
                }
            });
        }
    })(joint, _, window);
