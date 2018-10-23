
import View from '../view';

import '../../theme/components/resize/resize.css';

/**
 * The label view class.
 *
 * @extends module:ui/view~View
 */
export default class ResizeView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		/**
		 * The text of the div.
		 *
		 * @observable
		 * @member {String} #text
		 */
		this.set( 'text' );

		const bind = this.bindTemplate;

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'cke_resizer_ltr',
                    'cke_resizer',
                    'ckresizer'
				]
			},
			children: [
				{
					text: bind.to( 'text' )
				}
			]
		} );
    }
    
}
