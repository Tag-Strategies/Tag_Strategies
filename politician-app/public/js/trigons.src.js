/*****************************************************************************************
 * @name:      trigons.src.js - d3.js plugin for creating and animating colored triangles
 * @version:   1.3
 * @requires:  d3.js v5 or later (https://d3js.org)
 * @URL:       https://trigons.net
 * @copyright: (c) 2014 - 2019 DeeThemes (https://codecanyon.net/user/DeeThemes)
 * @licenses:  https://codecanyon.net/licenses/regular
               https://codecanyon.net/licenses/extended
******************************************************************************************/

//creating Trigons d3 plugin
(function () {
	"use strict";

	//if true, shows in Console a container's node where Trigons image is placed and all its stored options
	var debug = false,
		d3 = window.d3,
		canvg = window.canvg,
		temporaryIndexOf;

	// The main method for creating and redrawing of trigons
	// must be called first
	d3.selection.prototype.trigons = function (opt, val) {
		var options;
		if (arguments.length < 2) {
			if (opt === undefined) {
				options = {};
			} else {
				options = opt;
			}
		} else {
			options = {};
			options[opt] = val;
		}

		// do the following for each container element in d3 selection
		this.each(function () {
			var container = d3.select(this),
				optionsToStore = {},
				savedOptions = {},
				curOptions = {},
				unique = 'tgs' + uniqueNum() + '-',
				curColor,
				palette = [],
				scale,
				index,
				i;

			// container always is an element where Trigons are placed
			container.classed('tgs-trigons', true)
				.each(function (d) { savedOptions = d; })
				.selectAll('svg').remove();

			// check for default options
			if (savedOptions === undefined) {//first init

				/*
				 * Start default options values
				 */
				// dimensions
				optionsToStore.width = checkDefaults(options.width, 900);
				optionsToStore.height = checkDefaults(options.height, 500);
				optionsToStore.size = checkDefaults(options.size, 140);
				optionsToStore.offset = checkDefaults(options.offset, 0.8);
				// colors
				optionsToStore.colors = checkDefaults(options.colors, '#007700, #004500');
				optionsToStore.colorMode = checkDefaults(options.colorMode, 'simple');
				optionsToStore.colorBuild = checkDefaults(options.colorBuild, 'build9');
				optionsToStore.colorSpace = checkDefaults(options.colorSpace, 'rgb');
				optionsToStore.colorWay = checkDefaults(options.colorWay, 0.5);
				optionsToStore.lightDark = checkDefaults(options.lightDark, 2);
				// responsive or not
				optionsToStore.responsive = checkDefaults(options.responsive, true);
				// visible on initialization
				optionsToStore.startVisible = checkDefaults(options.startVisible, true);
				// callbacks
				optionsToStore.beforeCreate = checkDefaults(options.beforeCreate, false);
				optionsToStore.afterCreate = checkDefaults(options.afterCreate, false);
				/*
				 * End default options values
				 */

				// flag for trigonsAnimInit, do not change it
				optionsToStore.flag = false;
			} else { // when redraw
				optionsToStore.width = checkDefaults(options.width, savedOptions.width);
				optionsToStore.height = checkDefaults(options.height, savedOptions.height);
				optionsToStore.size = checkDefaults(options.size, savedOptions.size);
				optionsToStore.offset = checkDefaults(options.offset, savedOptions.offset);
				optionsToStore.colors = checkDefaults(options.colors, savedOptions.colors);
				optionsToStore.colorMode = checkDefaults(options.colorMode, savedOptions.colorMode);
				optionsToStore.colorBuild = checkDefaults(options.colorBuild, savedOptions.colorBuild);
				optionsToStore.colorSpace = checkDefaults(options.colorSpace, savedOptions.colorSpace);
				optionsToStore.colorWay = checkDefaults(options.colorWay, savedOptions.colorWay);
				optionsToStore.lightDark = checkDefaults(options.lightDark, savedOptions.lightDark);
				optionsToStore.responsive = checkDefaults(options.responsive, savedOptions.responsive);
				optionsToStore.startVisible = checkDefaults(options.startVisible, savedOptions.startVisible);
				optionsToStore.beforeCreate = checkDefaults(options.beforeCreate, savedOptions.beforeCreate);
				optionsToStore.afterCreate = checkDefaults(options.afterCreate, savedOptions.afterCreate);
			}

			// remove all invalid chars
			if (typeof optionsToStore.width === 'string') {
				optionsToStore.width = Number(optionsToStore.width.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.height === 'string') {
				optionsToStore.height = Number(optionsToStore.height.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.size === 'string') {
				optionsToStore.size = Number(optionsToStore.size.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.offset === 'string') {
				optionsToStore.offset = Number(optionsToStore.offset.replace(/[^0-9.]/g, ''));
			}
			if (typeof optionsToStore.colorWay === 'string') {
				optionsToStore.colorWay = Number(optionsToStore.colorWay.replace(/[^0-9.]/g, ''));
			}
			if (typeof optionsToStore.lightDark === 'string') {
				optionsToStore.lightDark = Number(optionsToStore.lightDark.replace(/[^0-9.\-]/g, ''));
			}

			// converting all 'true' and 'false' strings to boolean
			Object.keys(optionsToStore).forEach(function (key) {
				if (typeof optionsToStore[key] === 'string' && optionsToStore[key].toLowerCase() === 'true') {
					optionsToStore[key] = true;
				}
				if (typeof optionsToStore[key] === 'string' && optionsToStore[key].toLowerCase() === 'false') {
					optionsToStore[key] = false;
				}
			});

			// validate responsive
			temporaryIndexOf = [true, false];
			if (temporaryIndexOf.indexOf(optionsToStore.responsive) === -1) {
				optionsToStore.responsive = true;
			}

			// validate startVisible
			temporaryIndexOf = [true, false];
			if (temporaryIndexOf.indexOf(optionsToStore.startVisible) === -1) {
				optionsToStore.startVisible = true;
			}

			// make colors as array
			if (typeof optionsToStore.colors === 'string') {
				optionsToStore.colors = optionsToStore.colors.replace(/\s+/g, '').split(',');
			}

			// validate width
			if (optionsToStore.width <= 0) {
				optionsToStore.width = 900;
			}

			// validate height
			if (optionsToStore.height <= 0) {
				optionsToStore.height = 500;
			}

			// validate size
			if (optionsToStore.size <= 0) {
				optionsToStore.size = 140;
			}

			// validate offset
			if (optionsToStore.offset < 0.01) {
				optionsToStore.offset = 0.01;
			} else if (optionsToStore.offset > 1) {
				optionsToStore.offset = 1;
			}

			// validate colorMode
			temporaryIndexOf = ['build', 'gradient', 'simple'];
			if (temporaryIndexOf.indexOf(optionsToStore.colorMode) === -1) {
				optionsToStore.colorMode = 'simple';
			}

			// validate colorBuild
			temporaryIndexOf = ['build3', 'build4', 'build5', 'build6', 'build7', 'build8', 'build9', 'build10', 'build11'];
			if (temporaryIndexOf.indexOf(optionsToStore.colorBuild) === -1) {
				optionsToStore.colorBuild = 'build9';
			}

			// validate colorSpace
			temporaryIndexOf = ['rgb', 'hsl', 'hcl', 'lab'];
			if (temporaryIndexOf.indexOf(optionsToStore.colorSpace) === -1) {
				optionsToStore.colorSpace = 'rgb';
			}

			// validate colorWay
			if (optionsToStore.colorWay < 0 || optionsToStore.colorWay > 1) {
				optionsToStore.colorWay = 0.5;
			}

			// validate callbacks
			if (typeof (optionsToStore.beforeCreate) !== 'function') {
				optionsToStore.beforeCreate = false;
			}
			if (typeof (optionsToStore.afterCreate) !== 'function') {
				optionsToStore.afterCreate = false;
			}

			// saving options as data to container
			container.datum(mergeObjects(savedOptions, optionsToStore));
			container.each(function (d) { curOptions = d; });

			if (debug) {
				window.console.log('Container: ', container._groups[0][0].nodeName + ' ' + container._groups[0][0].id + ' ' + container._groups[0][0].className);
				window.console.log('Saved options: ', curOptions);
			}

			// this procedure utilizes the color creation principles as described in Tables 1 and 2 here:
			// http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.361.6082&rep=rep1&type=pdf
			if (curOptions.colorMode === 'build') {
				if (curOptions.colors.length === 1) {
					scale = d3.scaleLinear().domain([0, 12]).range([curOptions.colors, d3.lab(curOptions.colors).darker(curOptions.lightDark)]);
				} else if (curOptions.colors.length === 2) {
					scale = d3.scaleLinear().domain([0, 12]).range(curOptions.colors);
				} else {
					scale = d3.scaleLinear().domain([-7, 0, 7]).range(curOptions.colors);
				}
				switch (curOptions.colorSpace) {
				case 'lab':
					scale.interpolate(d3.interpolateLab);
					break;
				case 'hsl':
					scale.interpolate(d3.interpolateHsl);
					break;
				case 'hcl':
					scale.interpolate(d3.interpolateHcl);
					break;
				default: // rgb
					scale.interpolate(d3.interpolateRgb);
				}
				if (curOptions.colors.length <= 2) {
					switch (curOptions.colorBuild) {
					case 'build3':
						index = [2, 5, 8];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build4':
						index = [1, 4, 6, 9];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build5':
						index = [1, 4, 6, 8, 10];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build6':
						index = [1, 3, 5, 3, 8, 10];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build7':
						index = [1, 3, 5, 6, 7, 9, 11];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build8':
						index = [0, 2, 3, 5, 6, 7, 9, 11];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build9':
						index = [0, 2, 3, 5, 6, 7, 9, 10, 12];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					default:
						index = [0, 2, 3, 5, 6, 7, 9, 10, 12];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
					}
				} else { // color.length > 2
					switch (curOptions.colorBuild) {
					case 'build3':
						index = [-3, 0, 3];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build4':
						index = [-5, -2, 2, 5];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build5':
						index = [-5, -2, 0, 2, 5];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build6':
						index = [-6, -3, -1, 1, 3, 6];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build7':
						index = [-6, -3, -1, 0, 1, 3, 6];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build8':
						index = [-6, -4, -2, -1, 1, 2, 4, 6];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build9':
						index = [-6, -4, -2, -1, 0, 1, 2, 4, 6];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build10':
						index = [-7, -6, -4, -2, -1, 1, 2, 4, 6, 7];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					case 'build11':
						index = [-7, -6, -4, -2, -1, 0, 1, 2, 4, 6, 7];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
						break;
					default:
						index = [-7, -6, -4, -2, -1, 0, 1, 2, 4, 6, 7];
						for (i = 0; i < index.length; i += 1) {
							palette.push(scale(index[i]));
						}
					}
				}
				curColor = palette;
			} else {
				curColor = curOptions.colors;
			}

			// check for responsive svg
			if (curOptions.responsive) {
				container.classed('tgs-responsive', true);
			} else {
				container.classed('tgs-responsive', false);
				container.style('padding-bottom', null);
			}

			// callback 1 - before
			if (typeof (curOptions.beforeCreate) === 'function') {
				curOptions.beforeCreate();
			}

			// calling function 'create'
			create(
				container,
				unique,
				Number(curOptions.width),
				Number(curOptions.height),
				Number(curOptions.size),
				Number(curOptions.offset * curOptions.size),
				curColor,
				curOptions.colorMode,
				curOptions.colorSpace,
				Number(curOptions.colorWay),
				Number(curOptions.lightDark),
				curOptions.responsive,
				curOptions.startVisible
			);

			// reinit animation after redraw
			if (curOptions.animWasInited) {
				d3.select(this).trigonsAnimInit();
			}

			// callback 2 - after
			if (typeof (curOptions.afterCreate) === "function") {
				curOptions.afterCreate();
			}
		}); // end .each
		return this;
	}; // end .trigons

	// func for drawing of trigons
	function create(container, unique, width, height, size, offset, colors, colorModeArg, colorSpaceArg, colorWayArg, lightDarkArg, responsive, startVisibleArg) {
		var svg = container.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg').attr('version', '1.1'),
			defs,
			group,
			heightWidthRatio;

		function stopColor() {
			if (colors[1] === undefined) {
				switch (colorSpaceArg) {
				case 'lab':
					return d3.lab(colors[0]).darker(lightDarkArg);
				case 'hsl':
					return d3.hsl(colors[0]).darker(lightDarkArg);
				case 'hcl':
					return d3.hcl(colors[0]).darker(lightDarkArg);
				default: //rgb
					return d3.rgb(colors[0]).darker(lightDarkArg);
				}
			}
			return colors[1];
		}

		// if color mode is 'gradient', this func create gradients in <defs>
		function gradients(colors) {
			var j,
				gradient;
			for (j = 1; j < 17; j += 1) {
				gradient = defs.append('svg:linearGradient')
					.attr('id', 'gradient-' + unique + j)
					.attr('gradientUnits', 'objectBoundingBox');
				gradient.append('stop')
					.attr('class', 'stop1')
					.attr('stop-color', colors[0])
					.attr('offset', '0%');
				gradient.append('stop')
					.attr('class', 'stop2')
					.attr('offset', '100%')
					.attr('stop-color', stopColor());
			}
			svg.select('#gradient-' + unique + '1').attr({'x1': '0%', 'y1': '0%', 'x2': '100%', 'y2': '100%'});
			svg.select('#gradient-' + unique + '2').attr({'x1': '25%', 'y1': '0%', 'x2': '75%', 'y2': '100%'});
			svg.select('#gradient-' + unique + '3').attr({'x1': '50%', 'y1': '0%', 'x2': '50%', 'y2': '100%'});
			svg.select('#gradient-' + unique + '4').attr({'x1': '75%', 'y1': '0%', 'x2': '25%', 'y2': '100%'});
			svg.select('#gradient-' + unique + '5').attr({'x1': '100%', 'y1': '0%', 'x2': '0%', 'y2': '100%'});
			svg.select('#gradient-' + unique + '6').attr({'x1': '100%', 'y1': '25%', 'x2': '0%', 'y2': '75%'});
			svg.select('#gradient-' + unique + '7').attr({'x1': '100%', 'y1': '50%', 'x2': '0%', 'y2': '50%'});
			svg.select('#gradient-' + unique + '8').attr({'x1': '100%', 'y1': '75%', 'x2': '0%', 'y2': '25%'});
			svg.select('#gradient-' + unique + '9').attr({'x1': '100%', 'y1': '100%', 'x2': '0%', 'y2': '0%'});
			svg.select('#gradient-' + unique + '10').attr({'x1': '75%', 'y1': '100%', 'x2': '25%', 'y2': '0%'});
			svg.select('#gradient-' + unique + '11').attr({'x1': '50%', 'y1': '100%', 'x2': '50%', 'y2': '0%'});
			svg.select('#gradient-' + unique + '12').attr({'x1': '25%', 'y1': '100%', 'x2': '75%', 'y2': '0%'});
			svg.select('#gradient-' + unique + '13').attr({'x1': '0%', 'y1': '100%', 'x2': '100%', 'y2': '0%'});
			svg.select('#gradient-' + unique + '14').attr({'x1': '0%', 'y1': '75%', 'x2': '100%', 'y2': '25%'});
			svg.select('#gradient-' + unique + '15').attr({'x1': '0%', 'y1': '50%', 'x2': '100%', 'y2': '50%'});
			svg.select('#gradient-' + unique + '16').attr({'x1': '0%', 'y1': '25%', 'x2': '100%', 'y2': '75%'});
		}

		//creating vertices
		function vertices() {
			var horSections = Math.ceil((width + size * 2) / size),
				vertSections = Math.ceil((height + size * 2) / size),
				verts = d3.range(horSections * vertSections).map(function (d) {
					var col = d % horSections,
						row = Math.floor(d / horSections),
						x = size * col + Math.random() * offset,
						y = size * row + Math.random() * offset;
					x = parseFloat(x.toFixed(4));
					y = parseFloat(y.toFixed(4));
					return [x, y];
				});
			return verts;
		}

		//get x and y coordinates, array of colors and return interpolated color for one triangle
		function calculateColor(x, y, colors) {
			function colorScale(coord, side, colors) {
				var scale = d3.scaleLinear()
					.range(colors)
					.domain(d3.range(0, side, side / colors.length));
				return scale(coord);
			}
			switch (colorSpaceArg) {
			case 'lab':
				return d3.interpolateLab(
					colorScale(x, width, colors),
					colorScale(y, height, colors.map(function (value) {return d3.lab(value).brighter(0.6); }))
				)(colorWayArg);
			case 'hsl':
				return d3.interpolateHsl(
					colorScale(x, width + size, colors),
					colorScale(y, height + size, colors.map(function (value) {return d3.hsl(value).brighter(0.6); }))
				)(colorWayArg);
			case 'hcl':
				return d3.interpolateHcl(
					colorScale(x, width + size, colors),
					colorScale(y, height + size, colors.map(function (value) {return d3.hcl(value).brighter(0.6); }))
				)(colorWayArg);
			default: // rgb
				return d3.interpolateRgb(
					colorScale(x, width + size, colors),
					colorScale(y, height + size, colors.map(function (value) {return d3.rgb(value).brighter(0.6); }))
				)(colorWayArg);
			}
		}

		//all magic is in d3.voronoi().triangles()
		function draw(selection) {
			var col = -1,
				row = 0,
				count = -size,
				maxRow = 0,
				maxCol = 0,
				clean;
			if (colorModeArg === 'gradient') {
				gradients(colors);
			}
			clean = function (path) {
				var bbox = path.node().getBBox();
				if (bbox.x > width + size || bbox.y > height + size || bbox.x + bbox.width < size || bbox.y + bbox.height < size) {
					path.remove();
					return true;
				}
				return false;
			};
			d3.voronoi()
				.triangles(vertices())
				.forEach(function (d) {
					var bbox,
						midX,
						midY,
						dataToStore,
						path,
						color,
						gradUrl;
					if (colorModeArg === 'gradient') {
						path = selection.append('path').attr('d', 'M' + d.join('L') + 'Z');
						if (!clean(path)) {
							bbox = path.node().getBBox();
							midX = bbox.x + bbox.width / 2;
							midY = bbox.y + bbox.height / 2;
							if (midX - count > -(width - size)) {
								col = col + 1;
								count = midX;
								if (col > maxCol) {
									maxCol = col;
								}
							} else {
								col = 0;
								row = row + 1;
								count = -size;
								if (row > maxRow) {
									maxRow = row;
								}
							}
							dataToStore = {
								wh: [Math.round(bbox.width), Math.round(bbox.height)], // widht-height
								c: [Math.round(midX), Math.round(midY)], // center
								tl: [Math.round(bbox.x), Math.round(bbox.y)], // top-left
								tr: [Math.round(bbox.x + bbox.width), Math.round(bbox.y)], // top-right
								bl: [Math.round(bbox.x), Math.round(bbox.y + bbox.height)], // bottom-left
								br: [Math.round(bbox.x + bbox.width), Math.round(bbox.y + bbox.height)], // bottom-right
								col: col,
								row: row
							};
							gradUrl = 'url(#gradient-' + unique + getRandomInt(1, 16) + ')';
							path.datum(dataToStore)
								.attr('fill', gradUrl)
								.attr('stroke', gradUrl)
								.attr('class', 'row-' + row + ' ' + 'col-' + col);
						}
					} else { // if colorModeArg is 'build' or 'simple'
						path = selection.append('path').attr('d', 'M' + d.join('L') + 'Z');
						if (!clean(path)) {
							bbox = path.node().getBBox();
							midX = bbox.x + bbox.width / 2;
							midY = bbox.y + bbox.height / 2;
							if (midX - count > -(width - size)) {
								col = col + 1;
								count = midX;
								if (col > maxCol) {
									maxCol = col;
								}
							} else {
								col = 0;
								row = row + 1;
								count = -size;
								if (row > maxRow) {
									maxRow = row;
								}
							}
							color = calculateColor(Math.round(bbox.x) - size, Math.round(bbox.y) - size, colors);
							dataToStore = {
								wh: [Math.round(bbox.width), Math.round(bbox.height)],
								c: [Math.round(midX), Math.round(midY)],//center
								tl: [Math.round(bbox.x), Math.round(bbox.y)],//top-left
								tr: [Math.round(bbox.x + bbox.width), Math.round(bbox.y)],//top-right
								bl: [Math.round(bbox.x), Math.round(bbox.y + bbox.height)],//bottom-left
								br: [Math.round(bbox.x + bbox.width), Math.round(bbox.y + bbox.height)],//bottom-right
								col: col,
								row: row
							};
							path.datum(dataToStore)
								.attr('fill', color)
								.attr('stroke', color)
								.attr('class', 'row-' + row + ' ' + 'col-' + col);
						}
					}
				});
			selection.datum({'rows': (maxRow + 1), 'cols': (maxCol + 1)});
		} // end draw(...)

		if (responsive) {
			svg.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 ' + width + ' ' + height);
			heightWidthRatio = height / width * 100;
			container.style('padding-bottom', heightWidthRatio.toFixed(2) + '%');
		} else {
			svg.attr('width', width)
				.attr('height', height);
		}
		defs = svg.append('defs');
		group = svg.append('g').attr('transform', 'translate(' + (-size) + ' ' + (-size) + ')');

		//helper rect for force animation methods
		defs.append('rect');

		//creating all triangles
		draw(group);

		if (!startVisibleArg) {
			group.selectAll('path').style('opacity', 0);
		}
	}//end create(...)

	// func for animation init (not immediately animate)
	function initAnimation(container, animOrderArg, animInArg, delayInArg, durationInArg, easyInArg, animOutArg, delayOutArg, durationOutArg, easyOutArg, eventOnArg, eventTypeArg, eventRepeatArg, viewportShiftArg, beforeAnim, afterAnim) {
		var svg = container.selectAll('svg'),
			group = svg.selectAll('g'),
			rect = svg.selectAll('rect'),
			height,
			size,
			elem,
			shift,
			elemNode,
			handler,
			doneOnceIn = false,
			doneOnceOut = false,
			inProgress = false,
			finishedOut = false;

		if (animOrderArg === 'in-out') {
			finishedOut = true;
		}

		// proceed animation
		function animate(order, effectName, delay, duration, easing) {
			var tempEffect = effectName.match(/[^\-]*/i)[0], // getting effect name, (all chars untill first "-")
				rows,
				cols,
				a,
				paths,
				dur,
				del,
				animData = { // animation data
					effect1: {
						dSh: 0.3, // duration shift, from 0 to 1.
						frD: 0.2, // divide of frames time, from 0 to 1.
						fr: [ // frames (animation steps)
							{
								t: [0, 0], // translate(the multiplier for 'size' option) [x,y]
								s: [0.96, 0.96], // scale [x,y]
								r: 0, // rotate
								rotP: 'c', // rotation point
								o: 1 // opacity
							},
							{
								t: [0.2, -0.2],
								s: [ 0.96, 0.96],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect2: {
						dSh: 0.7,
						frD: 0.5,
						fr: [
							{
								t: [2, 0],
								s: [-1, 1],
								r: 40,
								rotP: 'tl',
								o: 0.7
							},
							{
								t: [-2, 0],
								s: [-1, 1],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect3: {
						dSh: 0.3,
						frD: 0.99,
						fr: [
							{
								t: [0, 0],
								s: [0, 0],
								r: 'rnd',//random
								rotRnd: [-360, 360],//random from deg1 to deg2
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 0],
								s: [0, 0],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect4: {
						dSh: 0.3,
						frD: 0.2,
						fr: [
							{
								t: [0, 0],
								s: [0.8, 0.8],
								r: 45,
								rotP: 'tr',
								o: 0.8
							},
							{
								t: [1, -1],
								s: [2, 2],
								r: 220,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect5: {
						dSh: 0.6,
						frD: 0.7,
						fr: [
							{
								t: [0, 0],
								s: [0.8, 0.8],
								r: -45,
								rotP: 'tl',
								o: 0.7
							},
							{
								t: [-0.5, -0.5],
								s: [0.6, 0.6],
								r: 180,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect6: {
						dSh: 0.3,
						frD: 0.9,
						fr: [
							{
								t: [1, 0],
								s: [-1, -1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [1, 0],
								s: [-1, -1],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect7: {
						dSh: 0.3,
						frD: 0.9,
						fr: [
							{
								t: [0, 0],
								s: [-1, 1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 0],
								s: [-0.2, 0.2],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect8: {
						dSh: 0.3,
						frD: 0.9,
						fr: [
							{
								t: [1, 0],
								s: [-1, 1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [1, 0],
								s: [1, 1],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect9: {
						dSh: 0.3,
						frD: 1,
						fr: [
							{
								t: [0, 1],
								s: [0.9, 0.9],
								r: -360,
								rotP: 'br',
								o: 0
							}
						]
					},
					effect10: {
						dSh: 0.3,
						frD: 1,
						fr: [
							{
								t: [0, 0],
								s: [0.9, 0.9],
								r: 360,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect11: {
						dSh: 0.5,
						frD: 0.4,
						fr: [
							{
								t: [0, 0],
								s: [0.94, 0.94],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 1.4],
								s: [0.94, 0.94],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect12: {
						dSh: 0.5,
						frD: 0.5,
						fr: [
							{
								t: [1, 1],
								s: [0.94, 0.94],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [ 0.2, -0.2],
								s: [0.8, 0.8],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect13: {
						dSh: 0.3,
						frD: 0.5,
						fr: [
							{
								t: [-2, 0],
								s: [-1, 1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [2, 0],
								s: [1, 1],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect14: {
						dSh: 0.3,
						frD: 0.5,
						fr: [
							{
								t: [0, -2],
								s: [1, -1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 2],
								s: [1, -1],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect15: {
						dSh: 0.1,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [0.8, 0.8],
								r: 100,
								rotP: 'bl',
								o: 0.8
							},
							{
								t: [-1, 1],
								s: [0.4, 0.4],
								r: 270,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect16: {
						dSh: 0.1,
						frD: 0.6,
						fr: [
							{
								t: [0, -0.2],
								s: [0.96, 0.96],
								r: 0,
								rotP: 'tl',
								o: 1
							},
							{
								t: [0, -1.4],
								s: [0.1, 0.7],
								r: 0,
								rotP: 'tl',
								o: 0
							}
						]
					},
					effect17: {
						dSh: 0.1,
						frD: 0.2,
						fr: [
							{
								t: [0, 0],
								s: [0.9, 0.9],
								r: 10,
								rotP: 'tl',
								o: 1
							},
							{
								t: [0, 0],
								s: [0.9, 0.9],
								r: -100,
								rotP: 'tl',
								o: 0
							}
						]
					},
					effect18: {
						dSh: 0.2,
						frD: 0.4,
						fr: [
							{
								t: [0, 0],
								s: [1, 1],
								r: -90,
								rotP: 'tl',
								o: 1
							},
							{
								t: [1, 1],
								s: [0.5, 0.5],
								r: 760,
								rotP: 'br',
								o: 0
							}
						]
					},
					effect19: {
						dSh: 0.2,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [0.6, 0.6],
								r: 'rnd',
								rotRnd: [-180, 180],
								rotP: 'c',
								o: 1
							},
							{
								t: [10, 0],
								s: [0.6, 0.6],
								r: 0,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect20: {
						dSh: 0.2,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [-1, 1],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, -2],
								s: [1, 1],
								r: 0,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect21: {
						dSh: 0.6,
						frD: 0.3,
						fr: [
							{
								t: [0, 0],
								s: [0.95, 0.95],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 0],
								s: [3, 0],
								r: 0,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect22: {
						dSh: 0.1,
						frD: 0.4,
						fr: [
							{
								t: [0, 0],
								s: [0.95, 0.95],
								r: 45,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 0],
								s: [-1, 0],
								r: 0,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect23: {
						dSh: 0.2,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [0.95, 0.95],
								r: 45,
								rotP: 'tr',
								o: 1
							},
							{
								t: [0, 0],
								s: [0, 0],
								r: -360,
								rotP: 'bl',
								o: 0
							}
						]
					},
					effect24: {
						dSh: 0.5,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [0.96, 0.96],
								r: 0,
								rotP: 'c',
								o: 0.8
							},
							{
								t: [0, -1],
								s: [3, 3],
								r: 0,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect25: {
						dSh: 0.4,
						frD: 0.5,
						fr: [
							{
								t: [0, -1],
								s: [1, 1],
								r: 'rnd',
								rotRnd: [-90, 90],
								rotP: 'c',
								o: 0.5
							},
							{
								t: [0, 0],
								s: [-1, 3],
								r: 160,
								rotP: 'c',
								o: 0
							}
						]
					},
					effect26: {
						dSh: 0,
						frD: 0.5,
						fr: [
							{
								t: [0, 0],
								s: [2, 2],
								r: 'rnd',
								rotRnd: [-45, 45],
								rotP: 'c',
								o: 0.8
							},
							{
								t: [0, -2],
								s: [0, 0],
								r: 0,
								rotRnd: [-180, 180],
								rotP: 'c',
								o: 0
							}
						]
					},
					effect27: {
						dSh: 0.1,
						frD: 1,
						fr: [
							{
								t: [0, -2],
								s: [1, 1],
								r: 'rnd',
								rotRnd: [-90, 90],
								rotP: 'c',
								o: 0
							}
						]
					},
					effect28: {
						dSh: 0.7,
						frD: 1,
						fr: [
							{
								t: [0, -2],
								s: [1, 1],
								r: 'rnd',
								rotRnd: [-90, 90],
								rotP: 'c',
								o: 0
							}
						]
					},
					effect29: {
						dSh: 0.5,
						frD: 1,
						fr: [
							{
								t: [0, 2],
								s: [1, 1],
								r: 'rnd',
								rotRnd: [-90, 90],
								rotP: 'c',
								o: 0
							}
						]
					},
					effect30: {
						dSh: 0.2,
						frD: 0.3,
						fr: [
							{
								t: [0, 0],
								s: [0.94, 0.94],
								r: 0,
								rotP: 'c',
								o: 1
							},
							{
								t: [0, 0],
								s: [0.0001, 0.0001],
								r: -360,
								rotP: 'bl',
								o: 0
							}
						]
					}
				}; // end var animData

			switch (easing) {
				case 'linear':
					easing = d3.easeLinear;
					break;
				case 'quad':
					easing = d3.easeQuad;
					break;
				case 'quad-in':
				case 'quadIn':
					easing = d3.easeQuadIn;
					break;
				case 'quad-out':
				case 'quadOut':
					easing = d3.easeQuadOut;
					break;
				case 'quad-in-out':
				case 'quad-out-in':
				case 'quadInOut':
				case 'quadOutIn':
					easing = d3.easeQuadInOut;
					break;
				case 'cubic':
					easing = d3.easeCubic;
					break;
				case 'cubic-in':
				case 'cubicIn':
					easing = d3.easeCubicIn;
					break;
				case 'cubic-out':
				case 'cubicOut':
					easing = d3.easeCubicOut;
					break;
				case 'cubic-in-out':
				case 'cubic-out-in':
				case 'cubicInOut':
				case 'cubicOutIn':
					easing = d3.easeCubicInOut;
					break;
				case 'sin':
					easing = d3.easeSin;
					break;
				case 'sin-in':
				case 'sinIn':
					easing = d3.easeSinIn;
					break;
				case 'sin-out':
				case 'sinOut':
					easing = d3.easeSinOut;
					break;
				case 'sin-in-out':
				case 'sin-out-in':
				case 'sinInOut':
				case 'sinOutIn':
					easing = d3.easeSinInOut;
					break;
				case 'exp':
					easing = d3.easeExp;
					break;
				case 'exp-in':
				case 'expIn':
					easing = d3.easeExpIn;
					break;
				case 'exp-out':
				case 'expOut':
					easing = d3.easeExpOut;
					break;
				case 'exp-in-out':
				case 'exp-out-in':
				case 'expInOut':
				case 'expOutIn':
					easing = d3.easeExpInOut;
					break;
				case 'circle':
					easing = d3.easeCircle;
					break;
				case 'circle-in':
				case 'circleIn':
					easing = d3.easeCircleIn;
					break;
				case 'circle-out':
				case 'circleOut':
					easing = d3.easeCircleOut;
					break;
				case 'circle-in-out':
				case 'circle-out-in':
				case 'circleInOut':
				case 'circleOutIn':
					easing = d3.easeCircleInOut;
					break;
				case 'elastic':
					easing = d3.easeElastic;
					break;
				case 'elastic-in':
				case 'elasticIn':
					easing = d3.easeElasticIn;
					break;
				case 'elastic-out':
				case 'elasticOut':
					easing = d3.easeElasticOut;
					break;
				case 'elastic-in-out':
				case 'elastic-out-in':
				case 'elasticInOut':
				case 'elasticOutIn':
					easing = d3.easeElasticInOut;
					break;
				case 'back':
					easing = d3.easeBack;
					break;
				case 'back-in':
				case 'backIn':
					easing = d3.easeBackIn;
					break;
				case 'back-out':
				case 'backOut':
					easing = d3.easeBackOut;
					break;
				case 'back-in-out':
				case 'back-out-in':
				case 'backInOut':
				case 'backOutIn':
					easing = d3.easeBackInOut;
					break;
				case 'bounce':
					easing = d3.easeBounce;
					break;
				case 'bounce-in':
				case 'bounceIn':
					easing = d3.easeBounceIn;
					break;
				case 'bounce-out':
				case 'bounceOut':
					easing = d3.easeBounceOut;
					break;
				case 'bounce-in-out':
				case 'bounce-out-in':
				case 'bounceInOut':
				case 'bounceOutIn':
					easing = d3.easeBounceInOut;
					break;
				case 'poly':
					easing = d3.easePoly;
					break;
				case 'poly-in':
				case 'polyIn':
					easing = d3.easePolyIn;
					break;
				case 'poly-out':
				case 'polyOut':
					easing = d3.easePolyOut;
					break;
				case 'poly-in-out':
				case 'poly-out-in':
				case 'polyInOut':
				case 'polyOutIn':
					easing = d3.easePolyInOut;
					break;
				default:
					easing = d3.easeCubicIn;
			}

			if (animData[tempEffect] !== undefined) {
				a = cloneObject(animData[tempEffect]);
			} else {
				a = cloneObject(animData.effect1);
			}

			//creating 2 dimensional array of all paths
			if (effectName.match(/bottom/)) {
				paths = [];
				group.each(function (d) {
					var r,
						i,
						c,
						temp;
					rows = d.rows;
					cols = d.cols;
					for (r = 0; r < rows; r += 1) {
						paths[r] = [];
						for (c = 0; c < cols; c += 1) {
							temp = group.selectAll('.row-' + r + '.col-' + c);
							if (!temp.empty()) {
								paths[r].push(temp);
							}
						}
					}
					for (i = 0; i < a.fr.length; i += 1) {
						a.fr[i].t[0] = a.fr[i].t[0] * -1;
						a.fr[i].t[1] = a.fr[i].t[1] * -1;
					}
				});
				paths.reverse();
			} else if (effectName.match(/left/)) {
				paths = [];
				group.each(function (d) {
					var r,
						i,
						c,
						temp;
					rows = d.rows;
					cols = d.cols;
					for (c = 0; c < cols; c += 1) {
						paths[c] = [];
						for (r = 0; r < rows; r += 1) {
							temp = group.selectAll('.row-' + r + '.col-' + c);
							if (!temp.empty()) {
								paths[c].push(temp);
							}
						}
					}
					for (i = 0; i < a.fr.length; i += 1) {
						a.fr[i].t.reverse();
					}
				});
			} else if (effectName.match(/right/)) {
				paths = [];
				group.each(function (d) {
					var r,
						i,
						c,
						temp;
					rows = d.rows;
					cols = d.cols;
					for (c = 0; c < cols; c += 1) {
						paths[c] = [];
						for (r = 0; r < rows; r += 1) {
							temp = group.selectAll('.row-' + r + '.col-' + c);
							if (!temp.empty()) {
								paths[c].push(temp);
							}
						}
					}
					for (i = 0; i < a.fr.length; i += 1) {
						a.fr[i].t.reverse();
						a.fr[i].t[0] = a.fr[i].t[0] * -1;
						a.fr[i].t[1] = a.fr[i].t[1] * -1;
					}
				});
				paths.reverse();
			} else { // top by default
				paths = [];
				group.each(function (d) {
					var r,
						c,
						temp;
					rows = d.rows;
					cols = d.cols;
					for (r = 0; r < rows; r += 1) {
						paths[r] = [];
						for (c = 0; c < cols; c += 1) {
							temp = group.selectAll('.row-' + r + '.col-' + c);
							if (!temp.empty()) {
								paths[r].push(temp);
							}
						}
					}
				});
			}

			switch (order) {
				case 'out':
					dur = duration / paths.length * (paths.length - paths.length * a.dSh);
					del = (duration - dur) / (paths.length - 1);
					group.transition()
						.duration(delay + duration)
						.ease(easing)
						.on('start', function () {
							if (typeof beforeAnim === 'function') {
								beforeAnim();
							}
							inProgress = true;
							group.selectAll('path')
								.attr('transform', 'translate(0,0) translate(0,0) scale(1,1) rotate(0)')
								.style('opacity', 1);
						})
						.each(function () {
							var frame0 = a.fr[0],
								frame1 = a.fr[1],
								r,
								c,
								t0;
							for (r = 0; r < paths.length; r += 1) {
								for (c = 0; c < paths[r].length; c += 1) {
									t0 = paths[r][c].transition()
										.delay(delay + del * r)
										.duration(dur * a.frD)
										.ease(easing)
										/* jshint ignore:start */
										.attrTween('transform', function (d) {
											var tr,
												trS,
												scale,
												rot,
												res;
											tr = 'translate(' + frame0.t[0] * size + ',' + frame0.t[1] * size + ') ';
											trS = 'translate(' + d.c[0] * (1 - frame0.s[0]) + ' ' + d.c[1] * (1 - frame0.s[1]) + ') ';
											scale = 'scale(' + frame0.s[0] + ',' + frame0.s[1] + ') ';
											if (frame0.r === 'rnd') {
												rot = 'rotate(' + getRandomInt(frame0.rotRnd[0], frame0.rotRnd[1]) + ',';
											} else {
												rot = 'rotate(' + frame0.r + ',';
											}
											if (frame0.rotP === 'tl') {
												rot += d.tl[0] + ',' + d.tl[1] + ')';
											} else if (frame0.rotP === 'tr') {
												rot += d.tr[0] + ',' + d.tr[1] + ')';
											} else if (frame0.rotP === 'bl') {
												rot += d.bl[0] + ',' + d.bl[1] + ')';
											} else if (frame0.rotP === 'br') {
												rot += d.br[0] + ',' + d.br[1] + ')';
											} else {
												rot += d.c[0] + ',' + d.c[1] + ')';
											}
											res = tr + trS + scale + rot;
											return d3.interpolateString('translate(0,0) translate(0,0) scale(1,1) rotate(0)', res);
										})
										/* jshint ignore:end */
										.style('opacity', frame0.o);
									if (frame1 !== undefined) {
										t0.transition()
											.duration(dur * (1 - a.frD))
											.ease(easing)
											/* jshint ignore:start */
											.attrTween('transform', function (d) {
												var tr,
													trS,
													scale,
													rot,
													res1,
													res2;
												tr = 'translate(' + frame0.t[0] * size + ',' + frame0.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame0.s[0]) + ' ' + d.c[1] * (1 - frame0.s[1]) + ') ';
												scale = 'scale(' + frame0.s[0] + ',' + frame0.s[1] + ') ';
												if (frame0.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame0.rotRnd[0], frame0.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame0.r + ',';
												}
												if (frame0.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame0.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame0.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame0.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res1 = tr + trS + scale + rot;
												tr = 'translate(' + frame1.t[0] * size + ',' + frame1.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame1.s[0]) + ' ' + d.c[1] * (1 - frame1.s[1]) + ') ';
												scale = 'scale(' + frame1.s[0] + ',' + frame1.s[1] + ') ';
												if (frame1.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame1.rotRnd[0], frame1.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame1.r + ',';
												}
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res2 = tr + trS + scale + rot;
												return d3.interpolateString(res1, res2);
											})
											/* jshint ignore:end */
											.style('opacity', frame1.o);
									}
								}
							}
						})
						.on('end', function () {
							if (typeof afterAnim === 'function') {
								afterAnim();
							}
							if (!eventRepeatArg) {
								doneOnceOut = true;
							} else {
								doneOnceOut = false;
							}
							inProgress = false;
							finishedOut = true;
						});
					break;
				case 'in':
					dur = duration / paths.length * (paths.length - paths.length * a.dSh);
					del = (duration - dur) / (paths.length - 1);

					group.transition()
						.duration(delay + duration)
						.ease(easing)
						.on('start', function () {
							var frame0,
								r,
								c;
							if (typeof beforeAnim === 'function') {
								beforeAnim();
							}
							inProgress = true;

							if (a.fr.length === 2) {
								frame0 = a.fr[1];
							} else {
								frame0 = a.fr[0];
							}

							for (r = 0; r < paths.length; r += 1) {
								for (c = 0; c < paths[r].length; c += 1) {
									paths[r][c]
										/* jshint ignore:start */
										.attr('transform', function (d) {
											var tr,
												trS,
												scale,
												rot;
											tr = 'translate(' + frame0.t[0] * size + ',' + frame0.t[1] * size + ') ';
											trS = 'translate(' + d.c[0] * (1 - frame0.s[0]) + ' ' + d.c[1] * (1 - frame0.s[1]) + ') ';
											scale = 'scale(' + frame0.s[0] + ',' + frame0.s[1] + ') ';
											if (frame0.r === 'rnd') {
												rot = 'rotate(' + getRandomInt(frame0.rotRnd[0], frame0.rotRnd[1]) + ',';
											} else {
												rot = 'rotate(' + frame0.r + ',';
											}
											if (frame0.rotP === 'tl') {
												rot += d.tl[0] + ',' + d.tl[1] + ')';
											} else if (frame0.rotP === 'tr') {
												rot += d.tr[0] + ',' + d.tr[1] + ')';
											} else if (frame0.rotP === 'bl') {
												rot += d.bl[0] + ',' + d.bl[1] + ')';
											} else if (frame0.rotP === 'br') {
												rot += d.br[0] + ',' + d.br[1] + ')';
											} else {
												rot += d.c[0] + ',' + d.c[1] + ')';
											}
											return (tr + trS + scale + rot);
										})
										/* jshint ignore:end */
										.style('opacity', frame0.o);
								}
							}
						})
						.each(function () {
							var frame0,
								frame1,
								r,
								c,
								t0;
							if (a.fr.length === 2) {
								frame0 = a.fr[1];
								frame1 = a.fr[0];
								for (r = 0; r < paths.length; r += 1) {
									for (c = 0; c < paths[r].length; c += 1) {
										t0 = paths[r][c].transition()
											.delay(delay + del * r)
											.duration(dur * (1 - a.frD))
											.ease(easing)
											/* jshint ignore:start */
											.attrTween('transform', function (d) {
												var tr,
													trS,
													scale,
													rot,
													res0,
													res1;
												tr = 'translate(' + frame0.t[0] * size + ',' + frame0.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame0.s[0]) + ' ' + d.c[1] * (1 - frame0.s[1]) + ') ';
												scale = 'scale(' + frame0.s[0] + ',' + frame0.s[1] + ') ';
												if (frame0.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame0.rotRnd[0], frame0.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame0.r + ',';
												}
												if (frame0.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame0.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame0.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame0.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res0 = tr + trS + scale + rot;
												tr = 'translate(' + frame1.t[0] * size + ',' + frame1.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame1.s[0]) + ' ' + d.c[1] * (1 - frame1.s[1]) + ') ';
												scale = 'scale(' + frame1.s[0] + ',' + frame1.s[1] + ') ';
												if (frame1.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame1.rotRnd[0], frame1.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame1.r + ',';
												}
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res1 = tr + trS + scale + rot;
												return d3.interpolateString(res0, res1);
											})
											/* jshint ignore:end */
											.style('opacity', frame1.o);
										t0.transition()
											.duration(dur * a.frD)
											.ease(easing)
											/* jshint ignore:start */
											.attrTween('transform', function (d) {
												var tr,
													trS,
													scale,
													rot,
													res1,
													res2;
												tr = 'translate(' + frame1.t[0] * size + ',' + frame1.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame1.s[0]) + ' ' + d.c[1] * (1 - frame1.s[1]) + ') ';
												scale = 'scale(' + frame1.s[0] + ',' + frame1.s[1] + ') ';
												if (frame1.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame1.rotRnd[0], frame1.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame1.r + ',';
												}
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res1 = tr + trS + scale + rot;
												tr = 'translate(0,0) ';
												trS = 'translate(0,0) ';
												scale = 'scale(1,1) ';
												rot = 'rotate(0,';
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res2 = tr + trS + scale + rot;
												return d3.interpolateString(res1, res2);
											})
											/* jshint ignore:end */
											.style('opacity', 1);
									}
								}
							} else {
								frame1 = a.fr[0];
								for (r = 0; r < paths.length; r += 1) {
									for (c = 0; c < paths[r].length; c += 1) {
										paths[r][c].transition()
											.delay(delay + del * r)
											.duration(dur)
											.ease(easing)
											/* jshint ignore:start */
											.attrTween('transform', function (d) {
												var tr,
													trS,
													scale,
													rot,
													res1,
													res2;
												tr = 'translate(' + frame1.t[0] * size + ',' + frame1.t[1] * size + ') ';
												trS = 'translate(' + d.c[0] * (1 - frame1.s[0]) + ' ' + d.c[1] * (1 - frame1.s[1]) + ') ';
												scale = 'scale(' + frame1.s[0] + ',' + frame1.s[1] + ') ';
												if (frame1.r === 'rnd') {
													rot = 'rotate(' + getRandomInt(frame1.rotRnd[0], frame1.rotRnd[1]) + ',';
												} else {
													rot = 'rotate(' + frame1.r + ',';
												}
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res1 = tr + trS + scale + rot;
												tr = 'translate(0,0) ';
												trS = 'translate(0,0) ';
												scale = 'scale(1,1) ';
												rot = 'rotate(0,';
												if (frame1.rotP === 'tl') {
													rot += d.tl[0] + ',' + d.tl[1] + ')';
												} else if (frame1.rotP === 'tr') {
													rot += d.tr[0] + ',' + d.tr[1] + ')';
												} else if (frame1.rotP === 'bl') {
													rot += d.bl[0] + ',' + d.bl[1] + ')';
												} else if (frame1.rotP === 'br') {
													rot += d.br[0] + ',' + d.br[1] + ')';
												} else {
													rot += d.c[0] + ',' + d.c[1] + ')';
												}
												res2 = tr + trS + scale + rot;
												return d3.interpolateString(res1, res2);
											})
											/* jshint ignore:end */
											.style('opacity', 1);
									}
								}
							}
						})
						.on('end', function () {
							if (typeof afterAnim === 'function') {
								afterAnim();
							}
							if (!eventRepeatArg) {
								doneOnceIn = true;
							} else {
								doneOnceIn = false;
							}
							inProgress = false;
							finishedOut = false;
						});
					break;
			}
		} // end animate(...)

		function bindEvent(eventTypeArg, elem) {
			elem.on(eventTypeArg, function () {
				if (animInArg && !animOutArg) {
					if (!inProgress) {
						if (!doneOnceIn) {
							animate('in', animInArg, delayInArg, durationInArg, easyInArg);
						}
					}
				} else if (!animInArg && animOutArg) {
					if (!inProgress) {
						if (!doneOnceOut) {
							animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
						}
					}
				} else if (animInArg && animOutArg) {
					if (!inProgress) {
						if (finishedOut) {
							if (!doneOnceIn) {
								animate('in', animInArg, delayInArg, durationInArg, easyInArg);
							}
						} else {
							if (!doneOnceOut) {
								animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
							}
						}
					}
				}
			});
		}

		// 'viewport' event occurs only once
		function viewportEvent(elemNode, shift) {
			return function () {
				var winHeight,
					inViewport;
				if (window.innerHeight && typeof window.innerHeight === 'number') {
					winHeight = window.innerHeight;
					if (shift > winHeight) {
						shift = winHeight - 10;
					}
				}
				inViewport = window.trigonsVerge.inViewport(elemNode, -shift);
				if (animInArg || animOutArg) {
					if (animOrderArg === 'in-out') {
						if (animInArg && !inProgress) {
							if (finishedOut) {
								if (!doneOnceIn) {
									if (inViewport) {
										animate('in', animInArg, delayInArg, durationInArg, easyInArg);
										doneOnceIn = true;
									}
								}
							}
						}
					} else if (animOrderArg === 'out-in') {
						if (animOutArg && !inProgress) {
							if (!finishedOut) {
								if (!doneOnceOut) {
									if (inViewport) {
										animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
										doneOnceOut = true;
									}
								}
							}
						}
					}
				}
			};
		}

		container.each(function (d) { height = d.height; size = d.size; });

		//creating pseudo events on invisible rectangle in <defs> for force animating methods
		//.trigonsAnimNext(), .trigonsAnimIn() and .trigonsAnimOut()
		rect.on('Next', function () {
			if (finishedOut) {
				if (!inProgress) {
					animate('in', animInArg, delayInArg, durationInArg, easyInArg);
				}
			} else {
				if (!inProgress) {
					animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
				}
			}
		});
		rect.on('forceNext', function () {
			if (finishedOut) {
				animate('in', animInArg, delayInArg, durationInArg, easyInArg);
			} else {
				animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
			}
		});
		rect.on('In', function () {
			if (!inProgress) {
				animate('in', animInArg, delayInArg, durationInArg, easyInArg);
			}
		});
		rect.on('forceIn', function () {
			animate('in', animInArg, delayInArg, durationInArg, easyInArg);
		});
		rect.on('Out', function () {
			if (!inProgress) {
				animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
			}
		});
		rect.on('forceOut', function () {
			animate('out', animOutArg, delayOutArg, durationOutArg, easyOutArg);
		});

		//reset events
		svg.on('click', null);
		svg.on('mouseenter', null);

		//click, hover and viewport events can be bind to another html elem, not container itself only
		if (eventOnArg === 'self') {
			elem = svg;
		} else {
			elem = d3.selectAll(eventOnArg);
			height = elem.style('height').replace(/[A-Za-z$\-]/g, '');
		}

		if (eventTypeArg === 'hover') {
			bindEvent('mouseenter', elem);
		} else if (eventTypeArg === 'click') {
			bindEvent('click', elem);
		} else if (eventTypeArg === 'viewport') {
			switch (viewportShiftArg) {
			case 'none':
				shift = 0;
				break;
			case 'one-fourth':
			case 'oneFourth':
				shift = height / 4;
				break;
			case 'one-third':
			case 'oneThird':
				shift = height / 3;
				break;
			case 'one-half':
			case 'oneHalf':
				shift = height / 2;
				break;
			case 'full':
				shift = height;
				break;
			default: // one-half
				shift = height / 2;
			}
			elemNode = elem.node();
			handler = viewportEvent(elemNode, shift);
			if (window.addEventListener) {
				window.addEventListener('DOMContentLoaded', handler, false);
				window.addEventListener('load', handler, false);
				window.addEventListener('scroll', handler, false);
				window.addEventListener('resize', handler, false);
			} else if (window.attachEvent) {
				window.attachEvent('onDOMContentLoaded', handler); // IE
				window.attachEvent('onload', handler);
				window.attachEvent('onscroll', handler);
				window.attachEvent('onresize', handler);
			}
		}
	} // end initAnimation(...)

	// the main method for animation init and reinit. Will work after calling of .trigons() first
	d3.selection.prototype.trigonsAnimInit = function (opt, val) {
		var options;
		if (arguments.length < 2) {
			if (opt === undefined) {
				options = {};
			} else {
				options = opt;
			}
		} else {
			options = {};
			options[opt] = val;
		}

		if (options.easyIn) {
			options.easeIn = options.easyIn;
		}
		if (options.easyOut) {
			options.easeOut = options.easyOut;
		}

		//do the following for each container element in d3 selection
		this.each(function () {
			var container = d3.select(this),
				optionsToStore = {},
				savedOptions = {},
				curOptions = {};

			if (container.selectAll('svg').empty()) {
				return this;
			}

			container.each(function (d) { savedOptions = d; });

			// defaults
			if (savedOptions.flag === false) {//first init
				// order of animation (first in, then out) or (first out, then in)
				optionsToStore.animOrder = checkDefaults(options.animOrder, 'in-out');
				// animation In
				optionsToStore.animIn = checkDefaults(options.animIn, 'effect1-top');
				optionsToStore.delayIn = checkDefaults(options.delayIn, 0);
				optionsToStore.durationIn = checkDefaults(options.durationIn, 1500);
				optionsToStore.easeIn = checkDefaults(options.easeIn, 'cubic-out');
				// animation Out
				optionsToStore.animOut = checkDefaults(options.animOut, 'effect1-top');
				optionsToStore.delayOut = checkDefaults(options.delayOut, 0);
				optionsToStore.durationOut = checkDefaults(options.durationOut, 1500);
				optionsToStore.easeOut = checkDefaults(options.easeOut, 'cubic-out');
				// events options
				optionsToStore.eventOn = checkDefaults(options.eventOn, 'self');
				optionsToStore.eventType = checkDefaults(options.eventType, 'click');
				optionsToStore.eventRepeat = checkDefaults(options.eventRepeat, true);
				optionsToStore.viewportShift = checkDefaults(options.viewportShift, 'one-fourth');
				// callbacks
				optionsToStore.beforeAnim = checkDefaults(options.beforeAnim, false);
				optionsToStore.afterAnim = checkDefaults(options.afterAnim, false);
			} else { // reinit
				optionsToStore.animOrder = checkDefaults(options.animOrder, savedOptions.animOrder);
				optionsToStore.animIn = checkDefaults(options.animIn, savedOptions.animIn);
				optionsToStore.delayIn = checkDefaults(options.delayIn, savedOptions.delayIn);
				optionsToStore.durationIn = checkDefaults(options.durationIn, savedOptions.durationIn);
				optionsToStore.easeIn = checkDefaults(options.easeIn, savedOptions.easeIn);
				optionsToStore.animOut = checkDefaults(options.animOut, savedOptions.animOut);
				optionsToStore.delayOut = checkDefaults(options.delayOut, savedOptions.delayOut);
				optionsToStore.durationOut = checkDefaults(options.durationOut, savedOptions.durationOut);
				optionsToStore.easeOut = checkDefaults(options.easeOut, savedOptions.easeOut);
				optionsToStore.eventOn = checkDefaults(options.eventOn, savedOptions.eventOn);
				optionsToStore.eventType = checkDefaults(options.eventType, savedOptions.eventType);
				optionsToStore.eventRepeat = checkDefaults(options.eventRepeat, savedOptions.eventRepeat);
				optionsToStore.viewportShift = checkDefaults(options.viewportShift, savedOptions.viewportShift);
				optionsToStore.beforeAnim = checkDefaults(options.beforeAnim, savedOptions.beforeAnim);
				optionsToStore.afterAnim = checkDefaults(options.afterAnim, savedOptions.afterAnim);
			}
			optionsToStore.flag = true;
			optionsToStore.animWasInited = true;

			// remove all chars except numbers
			if (typeof optionsToStore.delayIn === 'string') {
				optionsToStore.delayIn = Number(optionsToStore.delayIn.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.durationIn === 'string') {
				optionsToStore.durationIn = Number(optionsToStore.durationIn.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.delayOut === 'string') {
				optionsToStore.delayOut = Number(optionsToStore.delayOut.replace(/[^0-9]/g, ''));
			}
			if (typeof optionsToStore.durationOut === 'string') {
				optionsToStore.durationOut = Number(optionsToStore.durationOut.replace(/[^0-9]/g, ''));
			}

			//converting all 'true' and 'false' strings to boolean
			Object.keys(optionsToStore).forEach(function (key) {
				if (typeof optionsToStore[key] === 'string' && optionsToStore[key].toLowerCase() === 'true') {
					optionsToStore[key] = true;
				}
				if (typeof optionsToStore[key] === 'string' && optionsToStore[key].toLowerCase() === 'false') {
					optionsToStore[key] = false;
				}
			});

			// validate animOrder
			temporaryIndexOf = ['in-out', 'out-in'];
			if (temporaryIndexOf.indexOf(optionsToStore.animOrder) === -1) {
				optionsToStore.animOrder = 'in-out';
			}

			// validate delay
			if (optionsToStore.delayIn <= 0) {
				optionsToStore.delayIn = 0;
			}
			if (optionsToStore.delayOut <= 0) {
				optionsToStore.delayOut = 0;
			}

			// validate duration
			if (optionsToStore.durationIn <= 0) {
				optionsToStore.durationIn = 1500;
			}
			if (optionsToStore.durationOut <= 0) {
				optionsToStore.durationOut = 1500;
			}

			// validate eventType
			temporaryIndexOf = ['click', 'hover', 'viewport', 'none'];
			if (temporaryIndexOf.indexOf(optionsToStore.eventType) === -1) {
				optionsToStore.eventType = 'click';
			}

			// validate eventRepeat
			temporaryIndexOf = [true, false];
			if (temporaryIndexOf.indexOf(optionsToStore.eventRepeat) === -1) {
				optionsToStore.eventRepeat = true;
			}

			// validate viewportShift
			temporaryIndexOf = ['one-fourth', 'one-third', 'one-half', 'full', 'none'];
			if (temporaryIndexOf.indexOf(optionsToStore.viewportShift) === -1) {
				optionsToStore.viewportShift = 'one-fourth';
			}

			// validate callbacks
			if (typeof (optionsToStore.beforeAnim) !== 'function') {
				optionsToStore.beforeAnim = false;
			}
			if (typeof (optionsToStore.afterAnim) !== 'function') {
				optionsToStore.afterAnim = false;
			}

			// save options to container's data
			container.datum(mergeObjects(savedOptions, optionsToStore));
			container.each(function (d) { curOptions = d; });

			//call initAnimation fumc
			initAnimation(
				container,
				curOptions.animOrder,
				curOptions.animIn,
				Number(curOptions.delayIn),
				Number(curOptions.durationIn),
				curOptions.easeIn,
				curOptions.animOut,
				Number(curOptions.delayOut),
				Number(curOptions.durationOut),
				curOptions.easeOut,
				curOptions.eventOn,
				curOptions.eventType,
				curOptions.eventRepeat,
				curOptions.viewportShift,
				curOptions.beforeAnim,
				curOptions.afterAnim
			);
		});//end .each
		return this;
	};//end .trigonsAnimInit

	// method for immediate calling of an animation, if previos was 'in' the next will be 'out' and vise versa
	d3.selection.prototype.trigonsAnimNext = function (force) {
		if (force === undefined) {
			this.each(function () {
				d3.select(this).select('rect').on('Next')();
			});
		} else if (force) {
			this.each(function () {
				d3.select(this).select('rect').on('forceNext')();
			});
		}
		return this;
	};//end .trigonsAnimNext

	// method for calling of immediate 'In' animation
	d3.selection.prototype.trigonsAnimIn = function (force) {
		if (force === undefined) {
			this.each(function () {
				d3.select(this).select('rect').on('In')();
			});
		} else if (force) {
			this.each(function () {
				d3.select(this).select('rect').on('forceIn')();
			});
		}
		return this;
	};//end .trigonsAnimIn

	// method for calling of immediate 'Out' animation
	d3.selection.prototype.trigonsAnimOut = function (force) {
		if (force === undefined) {
			this.each(function () {
				d3.select(this).select('rect').on('Out')();
			});
		} else if (force) {
			this.each(function () {
				d3.select(this).select('rect').on('forceOut')();
			});
		}
		return this;
	};//end .trigonsAnimOut

	// method for converting from svg to png
	d3.selection.prototype.trigonsPng = function () {
		this.each(function () {
			var container = d3.select(this),
				w,
				h,
				svg,
				svgNode,
				svgData,
				canvas;
			if (container.select('svg').empty()) {
				return this;
			}
			container.classed('tgs-responsive', false);
			container.selectAll('path').attr('transform', null).style('opacity', 1);
			container.each(function (d) { w = d.width; h = d.height; });
			svg = container.select('svg');
			svg.attr({width: w, height: h});
			svgNode = svg.node();
			svgData = new window.XMLSerializer().serializeToString(svgNode);
			container.selectAll('*').remove();
			canvas = container.append('canvas');
			canvas.attr('width', w);
			canvas.attr('height', h);
			canvas.style('visibility', 'hidden');
			canvas = canvas.node();
			canvg(canvas, svgData, { ignoreMouse: true, ignoreDimensions: true });
			container.append('img').attr('src', canvas.toDataURL('image/png'));
			container.select('canvas').remove();
			if (svg.attr('viewBox')) {
				container.style('padding-bottom', null);
			}
		});
		return this;
	};//end .trigonsPng

	// method for making ready trigons as background image as svg
	d3.selection.prototype.trigonsBackground = function () {
		this.each(function () {
			var container = d3.select(this),
				w,
				h,
				svg,
				svgData,
				uri,
				url;
			if (container.select('svg').empty()) {
				return this;
			}
			container.classed('tgs-responsive', false);
			container.selectAll('path').attr('transform', null).style('opacity', 1);
			container.each(function (d) { w = d.width; h = d.height; });
			svg = container.select('svg');
			svg.attr('width', w);
			svg.attr('height', h);
			svg.attr('style', null);
			svg.style('overflow', 'hidden', 'important');
			svgData = new window.XMLSerializer().serializeToString(svg.node());
			uri = 'data:image/svg+xml;base64,' + window.btoa(svgData);
			url = 'url(' + uri + ')';
			container.attr('style', null);
			container.style('background-image', url);
			container.style('width', w + 'px');
			container.style('height', h + 'px');
			svg.remove();
		});
		return this;
	}; // end .trigonsBackground

	// Help functions
	
	// check for undefined
	function checkDefaults(a, b) {
		return (a !== undefined) ? a : b;
	}
	// random integer from range
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	// merge objects
	function mergeObjects(obj1, obj2) {
		if (obj1 === undefined) {
			obj1 = {};
		}
		Object.keys(obj2).forEach(function (p) {
			try {
				// Property in destination object is set; update its value.
				if (obj2[p].constructor === Object) {
					obj1[p] = mergeObjects(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				// Property in destination object is not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		});
		return obj1;
	}
	// cloning object
	function cloneObject(obj) {
		if (obj === null || typeof obj !== "object") {
			return obj;
		}
		// Works perfectly if there are no functions or undefined or Infinite in the object.
		return JSON.parse(JSON.stringify(obj));
	}
	//unique number from 1
	function uniqueNum() {
		uniqueNum.counter += 1;
		return uniqueNum.counter;
	}
	uniqueNum.counter = 1;
}()); // end call of anonymous func

//create and animate trigons in all elements with class 'trigons' when page is loaded
(function () {
	"use strict";
	var d3 = window.d3;
	d3.selectAll('.trigons').each(function () {
		var create = d3.select(this).attr('data-create'),
			animate = d3.select(this).attr('data-animate');
		if (create !== null && create !== '') {
			create = JSON.parse(create);
			d3.select(this).trigons(create);
		} else {
			d3.select(this).trigons();
		}
		if (animate !== null && animate !== '') {
			animate = JSON.parse(animate);
			d3.select(this).trigonsAnimInit(animate);
		} else if (animate === '') {
			d3.select(this).trigonsAnimInit();
		}
	});
}()); // end call of anonymous func

/*!
 * verge 1.10.2+201705300050
 * http://npm.im/verge
 * MIT Ryan Van Etten
 */

// "verge" Object is renamed as "trigonsVerge"

/* jshint ignore:start */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"trigonsVerge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return!(!(a=a&&!a.nodeType?a[0]:a)||1!==a.nodeType)&&b(a.getBoundingClientRect(),c)}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,(e="function"==typeof e?e.call(b):e)/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return a<b?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return a<b?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});
/* jshint ignore:end */
