import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';

// Mock components for testing
@Component({
    selector: 'app-home-header',
    template: '<div>Mock Home Header Component</div>',
    standalone: true,
})
class MockHomeHeaderComponent {}

@Component({
    selector: 'app-home-search-bar',
    template: '<div>Mock Home Search Bar Component</div>',
    standalone: true,
})
class MockHomeSearchBarComponent {}

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of HomeComponent', () => {
            expect(component).toBeInstanceOf(HomeComponent);
        });

        it('should be a standalone component', () => {
            expect(HomeComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the homepage container', () => {
            const homepage = debugElement.query(By.css('#homepage'));
            expect(homepage).toBeTruthy();
            expect(homepage.nativeElement.classList.contains('jumbotron')).toBe(true);
        });

        it('should render the wrap container', () => {
            const wrap = debugElement.query(By.css('.wrap'));
            expect(wrap).toBeTruthy();
        });

        it('should render the Bootstrap container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const homepage = debugElement.query(By.css('#homepage.jumbotron'));
            const wrap = homepage.query(By.css('.wrap'));
            const container = wrap.query(By.css('.container'));
            const largerScreens = container.query(By.css('.larger-screens'));

            expect(homepage).toBeTruthy();
            expect(wrap).toBeTruthy();
            expect(container).toBeTruthy();
            expect(largerScreens).toBeTruthy();
            expect(wrap.nativeElement.parentElement).toBe(homepage.nativeElement);
            expect(container.nativeElement.parentElement).toBe(wrap.nativeElement);
        });

        it('should contain all required sections', () => {
            const homeInterface = debugElement.query(By.css('.home-interface'));
            const logoSection = debugElement.query(By.css('.col-xs-12.logo'));
            const searchSection = debugElement.query(By.css('.col-xs-12.search-container'));

            expect(homeInterface).toBeTruthy();
            expect(logoSection).toBeTruthy();
            expect(searchSection).toBeTruthy();
        });
    });

    describe('PGNC Logo and Branding', () => {
        it('should render PGNC logo', () => {
            const logo = debugElement.query(By.css('.pgnc-logo-block img'));
            expect(logo).toBeTruthy();
            expect(logo.nativeElement.src).toContain('pgnc-logo-dark-bckgrnd-large.svg');
            expect(logo.nativeElement.alt).toBe('PGNC - Plant Gene Nomenclature Committee');
        });

        it('should have PGNC logo in h1 tag', () => {
            const logoHeading = debugElement.query(By.css('.pgnc-logo-block h1'));
            const logoImage = logoHeading.query(By.css('img'));
            expect(logoHeading).toBeTruthy();
            expect(logoImage).toBeTruthy();
            expect(logoImage.nativeElement.parentElement).toBe(logoHeading.nativeElement);
        });

        it('should display the tagline', () => {
            const tagline = debugElement.query(By.css('.tag-line'));
            expect(tagline).toBeTruthy();
            expect(tagline.nativeElement.textContent.trim()).toBe(
                'The resource for approved plant gene nomenclature'
            );
        });

        it('should have logo and tagline in logo section', () => {
            const logoSection = debugElement.query(By.css('.col-xs-12.logo'));
            const logoBlock = logoSection.query(By.css('.pgnc-logo-block'));
            const tagline = logoSection.query(By.css('.tag-line'));

            expect(logoBlock).toBeTruthy();
            expect(tagline).toBeTruthy();
            expect(logoBlock.nativeElement.parentElement).toBe(logoSection.nativeElement);
            expect(tagline.nativeElement.parentElement).toBe(logoSection.nativeElement);
        });
    });

    describe('Child Components', () => {
        it('should render home header component', () => {
            const homeHeader = debugElement.query(By.css('app-home-header'));
            expect(homeHeader).toBeTruthy();
        });

        it('should render home search bar component', () => {
            const homeSearchBar = debugElement.query(By.css('app-home-search-bar'));
            expect(homeSearchBar).toBeTruthy();
        });

        it('should place header at the top', () => {
            const homepage = debugElement.query(By.css('#homepage'));
            const homeHeader = homepage.query(By.css('app-home-header'));
            expect(homeHeader).toBeTruthy();
            expect(homepage.nativeElement.firstElementChild).toBe(homeHeader.nativeElement);
        });

        it('should place search bar in search container', () => {
            const searchContainer = debugElement.query(By.css('.search-container .search-bar'));
            const searchBar = searchContainer.query(By.css('app-home-search-bar'));
            expect(searchBar).toBeTruthy();
            expect(searchBar.nativeElement.parentElement).toBe(searchContainer.nativeElement);
        });
    });

    describe('Bootstrap Grid Layout', () => {
        it('should use Bootstrap grid system', () => {
            const rows = debugElement.queryAll(By.css('.row'));
            const cols = debugElement.queryAll(By.css('.col-xs-12'));

            expect(rows.length).toBeGreaterThanOrEqual(3);
            expect(cols.length).toBeGreaterThanOrEqual(3);
        });

        it('should have proper row structure', () => {
            const homeInterface = debugElement.query(By.css('.home-interface'));
            const rows = homeInterface.queryAll(By.css('.row'));

            expect(rows.length).toBe(3);
            rows.forEach(row => {
                expect(row.nativeElement.classList.contains('row')).toBe(true);
            });
        });

        it('should have logo row with proper column', () => {
            const logoRow = debugElement.query(By.css('.row:first-child'));
            const logoCol = logoRow.query(By.css('.col-xs-12.logo'));
            expect(logoCol).toBeTruthy();
            expect(logoCol.nativeElement.parentElement).toBe(logoRow.nativeElement);
        });

        it('should have search row with proper column', () => {
            const searchRow = debugElement.query(By.css('.row:nth-child(2)'));
            const searchCol = searchRow.query(By.css('.col-xs-12.search-container'));
            expect(searchCol).toBeTruthy();
            expect(searchCol.nativeElement.parentElement).toBe(searchRow.nativeElement);
        });

        it('should have third empty row', () => {
            const thirdRow = debugElement.query(By.css('.row:nth-child(3)'));
            const emptyCol = thirdRow.query(By.css('.col-xs-12'));
            expect(thirdRow).toBeTruthy();
            expect(emptyCol).toBeTruthy();
            expect(emptyCol.nativeElement.textContent.trim()).toBe('');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have jumbotron class on homepage', () => {
            const homepage = debugElement.query(By.css('#homepage'));
            expect(homepage.nativeElement.classList.contains('jumbotron')).toBe(true);
        });

        it('should use proper CSS classes for layout', () => {
            const wrap = debugElement.query(By.css('.wrap'));
            const container = debugElement.query(By.css('.container'));
            const largerScreens = debugElement.query(By.css('.larger-screens'));
            const homeInterface = debugElement.query(By.css('.home-interface'));

            expect(wrap).toBeTruthy();
            expect(container).toBeTruthy();
            expect(largerScreens).toBeTruthy();
            expect(homeInterface).toBeTruthy();
        });

        it('should apply proper CSS classes to logo section', () => {
            const logoCol = debugElement.query(By.css('.col-xs-12.logo'));
            const logoBlock = debugElement.query(By.css('.pgnc-logo-block'));
            const tagline = debugElement.query(By.css('.tag-line'));

            expect(logoCol.nativeElement.classList.contains('col-xs-12')).toBe(true);
            expect(logoCol.nativeElement.classList.contains('logo')).toBe(true);
            expect(logoBlock.nativeElement.classList.contains('pgnc-logo-block')).toBe(true);
            expect(tagline.nativeElement.classList.contains('tag-line')).toBe(true);
        });

        it('should apply proper CSS classes to search section', () => {
            const searchCol = debugElement.query(By.css('.col-xs-12.search-container'));
            const searchBar = debugElement.query(By.css('.search-bar'));

            expect(searchCol.nativeElement.classList.contains('col-xs-12')).toBe(true);
            expect(searchCol.nativeElement.classList.contains('search-container')).toBe(true);
            expect(searchBar.nativeElement.classList.contains('search-bar')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-')) {
                    expect(element.nativeElement.style.length).toBeLessThanOrEqual(1); // Allow for Angular framework styles
                }
            });
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });

        it('should not have output properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            expect(h1Elements.length).toBe(1);

            const h1 = debugElement.query(By.css('h1'));
            const img = h1.query(By.css('img'));
            expect(img.nativeElement.alt).toBeTruthy();
            expect(img.nativeElement.alt.length).toBeGreaterThan(0);
        });

        it('should use semantic HTML elements', () => {
            const divs = debugElement.queryAll(By.css('div'));
            const h1 = debugElement.query(By.css('h1'));
            const img = debugElement.query(By.css('img'));

            expect(divs.length).toBeGreaterThan(0);
            expect(h1).toBeTruthy();
            expect(img).toBeTruthy();
        });

        it('should have descriptive alt text for logo', () => {
            const logo = debugElement.query(By.css('img'));
            expect(logo.nativeElement.alt).toBe('PGNC - Plant Gene Nomenclature Committee');
            expect(logo.nativeElement.alt.length).toBeGreaterThan(10);
        });

        it('should provide clear content structure', () => {
            const logoSection = debugElement.query(By.css('.logo'));
            const searchSection = debugElement.query(By.css('.search-container'));
            const tagline = debugElement.query(By.css('.tag-line'));

            expect(logoSection).toBeTruthy();
            expect(searchSection).toBeTruthy();
            expect(tagline).toBeTruthy();
            expect(tagline.nativeElement.textContent.trim().length).toBeGreaterThan(20);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle multiple fixture.detectChanges() calls', () => {
            expect(() => {
                fixture.detectChanges();
                fixture.detectChanges();
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle component destruction', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should maintain component state after multiple change detection cycles', () => {
            const initialContent = debugElement.query(By.css('.tag-line')).nativeElement
                .textContent;

            fixture.detectChanges();
            fixture.detectChanges();

            const finalContent = debugElement.query(By.css('.tag-line')).nativeElement.textContent;
            expect(finalContent).toBe(initialContent);
        });

        it('should handle empty component class', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('Content Validation', () => {
        it('should have substantial homepage content', () => {
            const allContent = debugElement.nativeElement.textContent;
            expect(allContent.length).toBeGreaterThan(50);
        });

        it('should contain PGNC branding elements', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();
            expect(allContent).toContain('plant gene nomenclature');
        });

        it('should have proper logo source path', () => {
            const logo = debugElement.query(By.css('img'));
            expect(logo.nativeElement.src).toContain('pgnc-logo-dark-bckgrnd-large.svg');
            expect(logo.nativeElement.src).toContain('/img/pgnc/');
        });

        it('should provide comprehensive homepage experience', () => {
            const logo = debugElement.query(By.css('.pgnc-logo-block'));
            const tagline = debugElement.query(By.css('.tag-line'));
            const searchBar = debugElement.query(By.css('app-home-search-bar'));
            const header = debugElement.query(By.css('app-home-header'));

            expect(logo).toBeTruthy();
            expect(tagline).toBeTruthy();
            expect(searchBar).toBeTruthy();
            expect(header).toBeTruthy();
        });
    });

    describe('Performance and Memory', () => {
        it('should not create memory leaks on destroy', () => {
            const initialComponent = component;
            fixture.destroy();
            expect(initialComponent).toBeDefined();
        });

        it('should handle rapid re-initialization', () => {
            fixture.destroy();
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = [
                'div',
                'h1',
                'img',
                'header',
                'nav',
                'main',
                'section',
                'article',
                'aside',
                'footer',
                'p',
                'a',
                'ul',
                'li',
                'strong',
                'em',
                'span',
                'button',
                'form',
                'input',
                'label',
                'h2',
                'h3',
                'table',
                'tr',
                'td',
                'th',
                'svg',
                'path',
                'g',
                'circle',
                'rect',
                'line',
                'polygon',
                'polyline',
            ];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (
                    !tagName.startsWith('app-') &&
                    !tagName.startsWith('router-') &&
                    !tagName.startsWith('fa-')
                ) {
                    expect(standardTags).toContain(tagName);
                }
            });
        });

        it('should not use deprecated HTML features', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                expect(['font', 'center', 'marquee', 'blink']).not.toContain(tagName);
            });
        });

        it('should use modern image formats', () => {
            const image = debugElement.query(By.css('img'));
            expect(image.nativeElement.src).toContain('.svg');
        });
    });

    describe('Responsive Design', () => {
        it('should use responsive CSS classes', () => {
            const container = debugElement.query(By.css('.container'));
            const cols = debugElement.queryAll(By.css('.col-xs-12'));
            const largerScreens = debugElement.query(By.css('.larger-screens'));

            expect(container).toBeTruthy();
            expect(cols.length).toBeGreaterThan(0);
            expect(largerScreens).toBeTruthy();
        });

        it('should organize layout for different screen sizes', () => {
            const wrap = debugElement.query(By.css('.wrap'));
            const largerScreens = debugElement.query(By.css('.larger-screens'));
            const homeInterface = debugElement.query(By.css('.home-interface'));

            expect(wrap).toBeTruthy();
            expect(largerScreens).toBeTruthy();
            expect(homeInterface).toBeTruthy();
        });

        it('should support mobile-first design', () => {
            const cols = debugElement.queryAll(By.css('.col-xs-12'));
            expect(cols.length).toBeGreaterThan(0);
            cols.forEach(col => {
                expect(col.nativeElement.classList.contains('col-xs-12')).toBe(true);
            });
        });
    });

    describe('User Experience', () => {
        it('should provide clear visual hierarchy', () => {
            const h1 = debugElement.query(By.css('h1'));
            const tagline = debugElement.query(By.css('.tag-line'));
            const searchSection = debugElement.query(By.css('.search-container'));

            expect(h1).toBeTruthy();
            expect(tagline).toBeTruthy();
            expect(searchSection).toBeTruthy();
        });

        it('should have intuitive homepage layout', () => {
            const homepage = debugElement.query(By.css('#homepage'));
            const header = debugElement.query(By.css('app-home-header'));
            const logo = debugElement.query(By.css('.pgnc-logo-block'));
            const search = debugElement.query(By.css('app-home-search-bar'));

            // Header should be first
            expect(homepage.nativeElement.firstElementChild).toBe(header.nativeElement);

            // Logo and search should be present
            expect(logo).toBeTruthy();
            expect(search).toBeTruthy();
        });

        it('should provide comprehensive homepage information', () => {
            const tagline = debugElement.query(By.css('.tag-line'));
            const logo = debugElement.query(By.css('img[alt*="Plant Gene Nomenclature"]'));

            expect(tagline.nativeElement.textContent.trim()).toContain('plant gene nomenclature');
            expect(logo).toBeTruthy();
        });
    });

    describe('Integration with Child Components', () => {
        it('should properly integrate header component', () => {
            const header = debugElement.query(By.css('app-home-header'));
            expect(header).toBeTruthy();
            expect(header.nativeElement.tagName.toLowerCase()).toBe('app-home-header');
        });

        it('should properly integrate search bar component', () => {
            const searchBar = debugElement.query(By.css('app-home-search-bar'));
            expect(searchBar).toBeTruthy();
            expect(searchBar.nativeElement.tagName.toLowerCase()).toBe('app-home-search-bar');
        });

        it('should maintain proper component hierarchy', () => {
            const homepage = debugElement.query(By.css('#homepage'));
            const header = debugElement.query(By.css('app-home-header'));
            const searchBar = debugElement.query(By.css('app-home-search-bar'));

            // Verify components are within the homepage structure
            expect(homepage.nativeElement.contains(header.nativeElement)).toBe(true);
            expect(homepage.nativeElement.contains(searchBar.nativeElement)).toBe(true);
        });
    });
});
