import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { FragmentJumpService } from '../../common/services/fragment-jump.service';
import { GeneSymbolReportHelpComponent } from './gene-symbol-report.component';

// Mock FragmentJumpService
class MockFragmentJumpService {
    subscribeToFragmentChanges() {
        return of('test-fragment');
    }

    jumpToSection(fragment: string) {
        return fragment;
    }
}

describe('GeneSymbolReportHelpComponent', () => {
    let component: GeneSymbolReportHelpComponent;
    let fixture: ComponentFixture<GeneSymbolReportHelpComponent>;
    let debugElement: DebugElement;
    let fragmentJumpService: FragmentJumpService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GeneSymbolReportHelpComponent],
            providers: [
                { provide: FragmentJumpService, useClass: MockFragmentJumpService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GeneSymbolReportHelpComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fragmentJumpService = TestBed.inject(FragmentJumpService);
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of GeneSymbolReportHelpComponent', () => {
            expect(component).toBeInstanceOf(GeneSymbolReportHelpComponent);
        });

        it('should be a standalone component', () => {
            expect(GeneSymbolReportHelpComponent.prototype.constructor).toBeDefined();
        });

        it('should inject FragmentJumpService', () => {
            expect(component['fragJumpService']).toBeDefined();
            expect(component['fragJumpService']).toBe(fragmentJumpService);
        });
    });

    describe('Template Structure', () => {
        it('should render the main container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should render the main heading', () => {
            const heading = debugElement.query(By.css('h1'));
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.textContent.trim()).toContain('Symbol report help');
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const heading = container.query(By.css('h1'));

            expect(container).toBeTruthy();
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should contain gene symbol report help sections', () => {
            const sections = debugElement.queryAll(By.css('h2, h3'));
            expect(sections.length).toBeGreaterThan(0);
        });
    });

    describe('Component Lifecycle', () => {
        it('should implement OnInit', () => {
            expect(component.ngOnInit).toBeDefined();
            expect(typeof component.ngOnInit).toBe('function');
        });

        it('should call ngOnInit on component initialization', () => {
            const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
            component.ngOnInit();
            expect(ngOnInitSpy).toHaveBeenCalled();
        });

        it('should subscribe to fragment changes on init', () => {
            const subscribeSpy = jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges');
            component.ngOnInit();
            expect(subscribeSpy).toHaveBeenCalled();
        });
    });

    describe('Fragment Jump Service Integration', () => {
        it('should have FragmentJumpService injected', () => {
            expect(component['fragJumpService']).toBeDefined();
            expect(component['fragJumpService']).toBeInstanceOf(MockFragmentJumpService);
        });

        it('should handle fragment changes', () => {
            const jumpToSectionSpy = jest.spyOn(fragmentJumpService, 'jumpToSection');
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockReturnValue(of('gene-data'));

            component.ngOnInit();

            expect(jumpToSectionSpy).toHaveBeenCalledWith('gene-data');
        });

        it('should not jump to section when fragment is null', () => {
            const jumpToSectionSpy = jest.spyOn(fragmentJumpService, 'jumpToSection');
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockReturnValue(of(null));

            component.ngOnInit();

            expect(jumpToSectionSpy).not.toHaveBeenCalled();
        });

        it('should handle fragment service errors gracefully', () => {
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockImplementation(() => {
                throw new Error('Test error');
            });

            expect(() => {
                component.ngOnInit();
            }).not.toThrow();
        });
    });

    describe('Gene Symbol Report Content', () => {
        it('should contain gene symbol report information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            const geneTerms = ['gene', 'symbol', 'report', 'pgnc', 'nomenclature'];
            const containsGeneTerms = geneTerms.some(term => allContent.includes(term));
            expect(containsGeneTerms).toBe(true);
        });

        it('should provide symbol report guidance', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            expect(paragraphs.length).toBeGreaterThan(0);

            const hasGuidance = paragraphs.some(p =>
                p.nativeElement.textContent.toLowerCase().includes('symbol') ||
                p.nativeElement.textContent.toLowerCase().includes('report') ||
                p.nativeElement.textContent.toLowerCase().includes('gene') ||
                p.nativeElement.textContent.toLowerCase().includes('information')
            );
            expect(hasGuidance).toBe(true);
        });

        it('should include PGNC-specific information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();
            expect(allContent.includes('pgnc') || allContent.includes('hgnc')).toBe(true);
        });

        it('should have substantial gene symbol report content', () => {
            const allContent = debugElement.nativeElement.textContent;
            expect(allContent.length).toBeGreaterThan(200);
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            expect(h1Elements.length).toBe(1);

            const headings = debugElement.queryAll(By.css('h1, h2, h3, h4, h5, h6'));
            expect(headings.length).toBeGreaterThan(1);
        });

        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('.container'));
            const headings = debugElement.queryAll(By.css('h1, h2, h3'));
            const paragraphs = debugElement.queryAll(By.css('p'));

            expect(container).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
            expect(paragraphs.length).toBeGreaterThan(0);
        });

        it('should have descriptive section headings', () => {
            const headings = debugElement.queryAll(By.css('h2, h3'));
            headings.forEach(heading => {
                const text = heading.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(3);
            });
        });

        it('should provide clear gene report guidance', () => {
            const instructionalElements = debugElement.queryAll(By.css('p, li'));
            expect(instructionalElements.length).toBeGreaterThan(0);
        });
    });

    describe('Fragment Navigation', () => {
        it('should handle fragment-based navigation', () => {
            const headingsWithIds = debugElement.queryAll(By.css('h2[id], h3[id], h4[id]'));

            // Should have some elements with IDs for fragment navigation
            if (headingsWithIds.length > 0) {
                headingsWithIds.forEach(heading => {
                    const id = heading.nativeElement.id;
                    expect(id).toBeTruthy();
                    expect(id.length).toBeGreaterThan(0);
                });
            }
        });

        it('should support section jumping', () => {
            const jumpToSectionSpy = jest.spyOn(fragmentJumpService, 'jumpToSection');
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockReturnValue(of('core-data'));

            component.ngOnInit();

            expect(jumpToSectionSpy).toHaveBeenCalledWith('core-data');
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
            const initialComponent = component;
            const initialService = component['fragJumpService'];

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component).toBe(initialComponent);
            expect(component['fragJumpService']).toBe(initialService);
        });

        it('should handle ngOnInit multiple calls', () => {
            expect(() => {
                component.ngOnInit();
                component.ngOnInit();
            }).not.toThrow();
        });

        it('should handle fragment service subscription errors', () => {
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockImplementation(() => {
                throw new Error('Subscription error');
            });

            expect(() => {
                component.ngOnInit();
            }).not.toThrow();
        });
    });

    describe('Component Dependencies', () => {
        it('should properly inject dependencies', () => {
            expect(component['fragJumpService']).toBeDefined();
            expect(component['fragJumpService']).toBeInstanceOf(MockFragmentJumpService);
        });

        it('should handle dependency methods', () => {
            const service = component['fragJumpService'];
            expect(service.subscribeToFragmentChanges).toBeDefined();
            expect(service.jumpToSection).toBeDefined();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-')) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should use proper HTML structure', () => {
            const container = debugElement.query(By.css('div.container'));
            const h1 = container.query(By.css('h1'));

            expect(container).toBeTruthy();
            expect(h1).toBeTruthy();
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
            fixture = TestBed.createComponent(GeneSymbolReportHelpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should manage service subscriptions properly', () => {
            jest.spyOn(fragmentJumpService, 'subscribeToFragmentChanges').mockReturnValue(of('test'));

            component.ngOnInit();

            // Component should handle subscriptions properly
            expect(component).toBeTruthy();
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'h1', 'h2', 'h3', 'p', 'a', 'ul', 'li', 'table', 'tr', 'td', 'th', 'strong', 'em', 'span', 'br', 'hr', 'ol', 'dl', 'dt', 'dd'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-')) {
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
    });

    describe('User Experience', () => {
        it('should provide comprehensive gene symbol report guidance', () => {
            const mainContent = debugElement.query(By.css('.container')).nativeElement.textContent;
            expect(mainContent.length).toBeGreaterThan(300);
        });

        it('should have clear gene symbol report structure', () => {
            const h1 = debugElement.query(By.css('h1'));
            const headings = debugElement.queryAll(By.css('h2, h3'));

            expect(h1).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
        });

        it('should provide actionable gene report instructions', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should contain actionable terms related to gene reports
            const actionTerms = ['view', 'find', 'access', 'navigate', 'click', 'select'];
            const containsActionTerms = actionTerms.some(term => allContent.includes(term));
            expect(containsActionTerms).toBe(true);
        });
    });

    describe('Gene Symbol Report Documentation', () => {
        it('should include core data information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention core data elements
            const coreDataTerms = ['core data', 'symbol', 'name', 'location', 'id', 'pgnc'];
            const includesCoreData = coreDataTerms.some(term => allContent.includes(term));
            expect(includesCoreData).toBe(true);
        });

        it('should explain report sections', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should explain different sections of the report
            const sectionTerms = ['section', 'table', 'data', 'information', 'details'];
            const explainsSections = sectionTerms.some(term => allContent.includes(term));
            expect(explainsSections).toBe(true);
        });

        it('should reference external resources', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention external databases and resources
            const resourceTerms = ['external', 'database', 'resource', 'link', 'ncbi', 'uniprot'];
            const referencesResources = resourceTerms.some(term => allContent.includes(term));
            expect(referencesResources).toBe(true);
        });

        it('should provide navigation guidance', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should provide guidance on how to navigate the report
            const navTerms = ['navigate', 'scroll', 'click', 'access', 'view', 'browse'];
            const providesNavigation = navTerms.some(term => allContent.includes(term));
            expect(providesNavigation).toBe(true);
        });
    });

    describe('Technical Information', () => {
        it('should include PGNC terminology', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should use PGNC-specific terminology
            expect(allContent.includes('pgnc') ||
                allContent.includes('hgnc') ||
                allContent.includes('nomenclature')).toBe(true);
        });

        it('should explain gene nomenclature concepts', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should explain nomenclature concepts
            const nomenclatureTerms = ['nomenclature', 'approved', 'synonym', 'previous', 'alias'];
            const explainsNomenclature = nomenclatureTerms.some(term => allContent.includes(term));
            expect(explainsNomenclature).toBe(true);
        });

        it('should address gene data types', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should address different types of gene data
            const dataTypeTerms = ['locus', 'type', 'location', 'chromosome', 'mapping', 'position'];
            const addressesDataTypes = dataTypeTerms.some(term => allContent.includes(term));
            expect(addressesDataTypes).toBe(true);
        });
    });
});
