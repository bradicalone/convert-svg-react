const Format = require('./format')

const {
	stylePattern,
	isColan,
	isSemiColan,
	isStyle,
	isColorPattern,
	isStopOpacity, 
	isClassPattern, 
	isxmlPattern, 
	cssObjects, 
	isTitle, 
	enabledBackground, 
	isVersion, 
	isXML, 
	isAdobeComment
} = require("./constants");

/**
 * Class to create new stringed svg element
 * 
 */
class Convert {
	/**
	 * 
	 * @param {String} string - path to svg file ex: './pathto/my.svg'
	 *
	 */
	constructor(string) {
		this.string = string
		this.svgCSS = ''
		this.removeStyleElement = false
	}

	/**
	 * @property {Function} checkString Reads file from path given by client
	 * @returns {object}
	 */
	checkString(string) {
		if (typeof this.string !== 'string') {
			console.log('not a string')

			return { error: `<h1>File path or file is not of string path.</h1>` }
		} else return string
	}

	/** Adds a string version of inline style element to be used as JSX
	 * @property {Function} stringify_STYLE_ELEM - Optional if user wants to leave style element in svg xml document
	 * @param {String} string - Newly indented string
	 */
	stringify_STYLE_ELEM(string) {
		//  True to return string of <style type="text/css"> .someElement{someTyle:#A5A5A5;}  </style>
		//    <style type="text/css">{
		//            '.photo-st0{fill:#C13838;}'+
		//        }
		// 	  </style>
		//  Or leave it, stringify it and use it within React

		if (stylePattern.test(string)) {
			if (this.removeStyleElement) {
				this.string = this.string.replace(stylePattern, '')

				// Where the svg Style element exist for client
				this.svgCSS = string.match(stylePattern)[0].replace(/\t/g, ' ')
			} else {
				let CSSobjects = string.match(cssObjects)
				let length = CSSobjects.length
				let toString = ''

				for (let i = 0; i < length; i++) {
					const element = CSSobjects[i];

					// If only one css object exist
					if (length === 1) {
						toString += element.replace(/(\..*;})/i, '<style type="text/css">{\n"$1"\n}</style>');
						break;
					}

					// Replaces first line
					if (i === 0) {
						toString += element.replace(/(\..*;})/i, '<style type="text/css">{\n"$1"+\n');
					}
					// Replaces last line
					else if (i === length - 1) {
						toString += element.replace(/(\..*;})/i, '"$1"\n}</style>');
					}
					// Replaces every other line
					else {
						toString += element.replace(/(\..*;})/i, ' "$1"+\n');
					}
				}
				return this.string.replace(/<style.*[\s\S]*<\/style>/gi, toString)
			}
		} else return string
	}

	/**
	 * 
	 * @property {Function} inlineStyleJSX - Looks for all xml attributes that need to be replaced 
	 * @param {String} string string after some replacement of attributes
	 * @param {object} Format Class object to format string; callback
	 * @returns {Object} - To strings sent; One for rendered version of svg and one for copy within Textarea
	 */
	inlineStyleJSX(string, Format) {
		const cssStringed = this.stringify_STYLE_ELEM(string)

		let individual_lines = cssStringed.split('\n')

		let i = individual_lines.length
		let regEx = new RegExp(/(style=)"(.*:.*;)"/, 'i')

		let newStyleObj = ''
		let newSTring = []
		//Goes through each line
		while (i--) {
			// Checks for only lines that contain style attributes
			if (regEx.test(individual_lines[i])) {
				let split_style_obj = individual_lines[i].match(regEx)[2].split(';')

				// Adds quotes to the values:   [ 'display:block', 'overflow:hidden', 'height: 100', '' ]  to  display:"block",overflow:"hidden",height:"100"
				split_style_obj.forEach(string => newStyleObj += string.replace(/(.*:)(\s?[#\w\d\.]+)/, '$1"$2",'))

				// replaces style="display:block;overflow:hidden;height:100;"  to  style={{display:"block",overflow:"hidden",height:"100"}}
				let x = individual_lines[i].replace(/(style=)"(.*:.*;)"/i, `$1{{${newStyleObj}}}`)
				newSTring.unshift(x + '\n')
				newStyleObj = ''
			} else {
				newSTring.unshift(individual_lines[i] + '\n')
			}
		}

		return Format.indent(newSTring.join(''))

	}


	/**
	 * 
	 * @property {Function} findAndReplace - Looks for all xml attributes that need to be replaced 
	 * @returns {Object} - To strings sent; One for rendered version of svg and one for copy within Textarea
	 */
	findAndReplace() {
		let string = this.string
		this.checkString(string)

		if (!typeof string) return `<div>Must be a valid string</div>`

		if (isxmlPattern.test(string)) {
			switch (true) {
				case /xmlns:xlink/gi.test(string):
					this.string = this.string.replace(/xmlns:xlink=".+\/xlink"\s/gi, '')
				case /xml:space/gi.test(string):
					this.string = this.string.replace(/xml:space/gi, 'xmlSpace')
				case /xlink:href/gi.test(string):
					this.string = this.string.replace(/xlink:href/gi, 'href')
			}
		}

		/* remove typical attributes and unnedded extra left over adobe file additions */
		switch (true) {
			case enabledBackground.test(string):
				this.string = this.string.replace(/style="enable-background.+"\s/g, '')
			case isColorPattern.test(string):
				this.string = this.string.replace(isColorPattern, 'stopColor')
			case isStopOpacity.test(string):
				this.string = this.string.replace(isStopOpacity, 'stopOpacity')
			case isXML.test(string):
				this.string = this.string.replace(isXML, '')
			case isClassPattern.test(string):
				this.string = this.string.replace(isClassPattern, 'className=')
			case isTitle.test(string):
				this.string = this.string.replace(/<title>.*<\/title>/, '')
			case isVersion.test(string):
				this.string = this.string.replace(isVersion, '')
			case isAdobeComment.test(string):
				this.string = this.string.replace(isAdobeComment, '')
		}

		this.string = this.string.replace(/(<.*style="stopColor|<.*style="stopColor)(:.*)("\/>)/gmi, '$1$2;$3')

		// Remove </path> and add / to end of path =>   />
		this.string = this.string.replace(/(<path.*)(>)\n?(<\/path>)/igm, '$1/$2')

		function catenate(match, p1, p2, p3) {
			return p1 + p2.toUpperCase() + p3
		}

		let hasDashedAttributes = string => /\s\w+-\w+=/ig.test(string)

		// Checks if style attributes not concatinated exist ex: font-size => fontSize, stroke-width => strokeWidth  ...
		const findAttributedDashes = (string) => {
			let stringArr = []

			if (hasDashedAttributes(string)) {
				let individual_lines = string.split('\n')
				let i = individual_lines.length

				while (i--) {
					let attribute = individual_lines[i].match(/\s(?:\w|=")+-\w+(=|:)/ig)
					if (attribute != null) {
						let replaced = individual_lines[i].replace(/(\s(?:\w|=")+)-(\w)(\w+(:|=))/i, catenate)

						stringArr.unshift(replaced)
					} else {
						stringArr.unshift(individual_lines[i] + '\n')
					}
				}
				const updatedString = stringArr.join('')

				// Recursion till all attributes have been concatinated
				hasDashedAttributes(updatedString) ? findAttributedDashes(updatedString) : this.string = updatedString

			} else {
				this.string = string
			}
		}
		findAttributedDashes(this.string)

		// Checks if inline style attributes not concatinated exist ex: style="font-size: 12px;"  =>  style="fontSize: 12px;" ..
		const catenateStyleAttribute = (string) => {
			let replaced = string.replace(/(\sstyle="\w+)-(\w)(.*)/ig, catenate)
			this.string = replaced
		}

		/**
		 * Format
		 * See {@link Format}
		 */
		let clientCopy = this.inlineStyleJSX(this.string, Format)

		return { renderedSVG: this.string, forCopy: clientCopy }
	}
}

module.exports = Convert
