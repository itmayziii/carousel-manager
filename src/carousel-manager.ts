import $ from 'jquery';

declare var Foundation;

export class CarouselManager {
    private _foundationCarousel;
    private _savedHtml;

    public constructor(private _elementContainerSelector: string,
                       private _elementSelector: string,
                       private _sizeForNonCarousel: string = 'large',
                       private _carouselOptions: object = {}) {
    };

    /**
     * Starts the carousel functionality.
     */
    public initialize(): void {
        const carouselElement = $(this._elementSelector);
        this._savedHtml = carouselElement.clone()[0];

        this._respondToInitialMediaQuery();
        this._listenToMediaQueryChanges();
    }

    /**
     * Add other controls besides the forward and back button.
     */
    public addControls(controlsSelector): void {
        const controlsElement = $(controlsSelector);

        controlsElement.click((event) => {
            const $currentTarget = $(event.currentTarget);
            if ($currentTarget.hasClass('active')) {
                return;
            }

            controlsElement.removeClass('active');
            $currentTarget.addClass('active');

            const carouselSlideSelectedId = $currentTarget.attr('carousel-control');
            const carouselSlideSelected = $(`#${carouselSlideSelectedId}`);

            $(this._elementSelector).foundation('changeSlide', true, carouselSlideSelected);
        });
    }

    /**
     * Handles the initial page load before the media query ever changes
     */
    private _respondToInitialMediaQuery(): void {
        this._respondToMediaQuerySize();
    }

    /**
     * Handles how the carousel should react when the media query changes.
     */
    private _respondToMediaQuerySize(): void {
        if (!this._sizeForNonCarousel) {
            this._addCarousel();
            return;
        }

        if (Foundation.MediaQuery.atLeast(this._sizeForNonCarousel)) {
            this._removeCarousel();
        } else {
            this._addCarousel();
        }
    }

    /**
     * Listens for the media query to change and responds.
     */
    private _listenToMediaQueryChanges(): void {
        $(window).on('changed.zf.mediaquery', () => {
            this._respondToMediaQuerySize();
        });
    }

    /**
     * When we carousel.destroy(), foundation does some weird stuff to the UI with styling, it is easier to replace the DOM.
     */
    private _replaceCarouselContent(): void {
        const savedElement = $(this._savedHtml).clone();

        const carouselElement = $(this._elementSelector);
        carouselElement.remove();
        $(this._elementContainerSelector).append(savedElement);
    }

    /**
     * Destroys the carousel, unless the carousel did not exist anyways, then we simply make sure the controls are not showing.
     */
    private _removeCarousel(): void {
        if (!this._foundationCarousel) {
            this._removeCarouselNextPrevButtons();
            return;
        }

        this._foundationCarousel.destroy();
        this._foundationCarousel = null;

        this._replaceCarouselContent();
        this._removeCarouselNextPrevButtons();
    }

    /**
     * We must show Orbits controls by default in order for the carousel to work, this helps us remove them conditionally.
     */
    private _removeCarouselNextPrevButtons(): void {
        const carouselContainer = $(this._elementContainerSelector);
        carouselContainer.find('.orbit-controls').remove();
    }

    /**
     * Adds the carousel functionality back
     */
    private _addCarousel(): void {
        if (this._foundationCarousel) {
            return;
        }

        this._replaceCarouselContent();

        const carouselElement = $(this._elementSelector);
        this._foundationCarousel = new Foundation.Orbit(carouselElement, this._carouselOptions);
    }
}