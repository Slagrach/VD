module.exports = {
	root: true,
	modules: {
		'bem-tools': {
			plugins: {
				create: {
					techs: ['pug', 'scss', 'js'],
					levels: {
						'./src/pug/components': {
							default: true
						}
					}
				}
			}
		}
	}
},

	{
		"root": true,
		"levels": [
			{
				"path": "level1",
				"scheme": "nested"
			},
			{
				"path": "level2",
				"scheme": "nested"
			},
			{
				"path": "path/to/level3",
				"scheme": "nested"
			}
		],
		"modules": {
			"bem-tools": {
				"plugins": {
					"create": {
						"techs": [
							"css", "js"
						],
						"templateFolder": ".bem/bem-tools-create/lib/templates",
						"templates": {
							"js-ymodules": ".bem/bem-tools-create/lib/templates/js"
						},
						"techsTemplates": {
							"js": "js-ymodules",
							"bemtree.js": "bemhtml.js"
						},
						"levels": {
							"path/to/level1": {
								"default": true
							},
							"path/to/level3": {
								"techs": ["bemhtml.js"]
							}
						}
					}
				}
			}
		}
	}
