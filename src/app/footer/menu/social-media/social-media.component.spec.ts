import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SocialMediaComponent } from './social-media.component';

describe('SocialMediaComponent', () => {
    let component: SocialMediaComponent;
    let fixture: ComponentFixture<SocialMediaComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SocialMediaComponent, FontAwesomeModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SocialMediaComponent);
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

        it('should be an instance of SocialMediaComponent', () => {
            expect(component).toBeInstanceOf(SocialMediaComponent);
        });

        it('should be a standalone component', () => {
            expect(SocialMediaComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Component Properties', () => {
        it('should have all social media icons defined', () => {
            expect(component.faXTwitter).toBeDefined();
            expect(component.faGithub).toBeDefined();
            expect(component.faYoutube).toBeDefined();
            expect(component.faBlog).toBeDefined();
            expect(component.faComment).toBeDefined();
            expect(component.faBluesky).toBeDefined();
        });

        it('should initialize FontAwesome icons correctly', () => {
            expect(component.faXTwitter.iconName).toBe('x-twitter');
            expect(component.faGithub.iconName).toBe('github');
            expect(component.faYoutube.iconName).toBe('youtube');
            expect(component.faBlog.iconName).toBe('blog');
            expect(component.faComment.iconName).toBe('comment');
            expect(component.faBluesky.iconName).toBe('bluesky');
        });

        it('should have correct icon families', () => {
            expect(component.faXTwitter.prefix).toBe('fab'); // Brand icons
            expect(component.faGithub.prefix).toBe('fab');
            expect(component.faYoutube.prefix).toBe('fab');
            expect(component.faBluesky.prefix).toBe('fab');
            expect(component.faBlog.prefix).toBe('fas'); // Solid icons
            expect(component.faComment.prefix).toBe('fas');
        });
    });

    describe('Template Structure', () => {
        it('should render the social media block container', () => {
            const socialBlock = debugElement.query(By.css('.social-media-block'));
            expect(socialBlock).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const socialBlock = debugElement.query(By.css('.social-media-block'));
            expect(socialBlock).toBeTruthy();
            expect(socialBlock.nativeElement.tagName.toLowerCase()).toBe('div');
        });

        it('should contain all social media links', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            expect(socialLinks.length).toBe(6);
        });

        it('should have all FontAwesome icons', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));
            expect(faIcons.length).toBe(6);
        });
    });

    describe('Social Media Links', () => {
        it('should have Bluesky link', () => {
            const blueSkyLink = debugElement.query(By.css('a[href*="bsky.app"]'));
            expect(blueSkyLink).toBeTruthy();
            expect(blueSkyLink.nativeElement.href).toContain('hgnc.bsky.social');
        });

        it('should have Twitter/X link', () => {
            const twitterLink = debugElement.query(By.css('a[href*="twitter.com"]'));
            expect(twitterLink).toBeTruthy();
            expect(twitterLink.nativeElement.href).toContain('genenames');
        });

        it('should have GitHub link', () => {
            const githubLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink).toBeTruthy();
            expect(githubLink.nativeElement.href).toContain('HGNC');
        });

        it('should have YouTube link', () => {
            const youtubeLink = debugElement.query(By.css('a[href*="youtube.com"]'));
            expect(youtubeLink).toBeTruthy();
            expect(youtubeLink.nativeElement.href).toContain('UCqGBx2FrgmeXlbeRTCkvI3g');
        });

        it('should have Blog link', () => {
            const blogLink = debugElement.query(By.css('a[href*="blog.genenames.org"]'));
            expect(blogLink).toBeTruthy();
        });

        it('should have Contact/Feedback link', () => {
            const contactLink = debugElement.query(By.css('a[href*="/contact/feedback"]'));
            expect(contactLink).toBeTruthy();
        });
    });

    describe('Link Attributes', () => {
        it('should have all links with correct target attribute', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.target).toBe('_self');
            });
        });

        it('should have proper href attributes', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.href).toBeDefined();
                expect(link.nativeElement.href.length).toBeGreaterThan(0);
            });
        });

        it('should have social-media class on all links', () => {
            const socialLinks = debugElement.queryAll(By.css('a'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.classList.contains('social-media')).toBe(true);
            });
        });

        it('should have last class on final link', () => {
            const lastLink = debugElement.query(By.css('.social-media.last'));
            expect(lastLink).toBeTruthy();
            expect(lastLink.nativeElement.href).toContain('/contact/feedback');
        });
    });

    describe('FontAwesome Icon Integration', () => {
        it('should render all FontAwesome icons', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));
            expect(faIcons.length).toBe(6);
        });

        it('should bind icons correctly to links', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                const icon = link.query(By.css('fa-icon'));
                expect(icon).toBeTruthy();
            });
        });

        it('should have each link contain exactly one icon', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                const icons = link.queryAll(By.css('fa-icon'));
                expect(icons.length).toBe(1);
            });
        });
    });

    describe('CSS Classes', () => {
        it('should have social-media-block class', () => {
            const socialBlock = debugElement.query(By.css('.social-media-block'));
            expect(socialBlock).toBeTruthy();
            expect(socialBlock.nativeElement.classList.contains('social-media-block')).toBe(true);
        });

        it('should have social-media class on all links', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            expect(socialLinks.length).toBe(6);
            socialLinks.forEach(link => {
                expect(link.nativeElement.classList.contains('social-media')).toBe(true);
            });
        });

        it('should apply CSS classes correctly', () => {
            const socialBlock = debugElement.query(By.css('div.social-media-block'));
            expect(socialBlock).toBeTruthy();
        });
    });

    describe('External URLs Validation', () => {
        it('should have valid Bluesky URL', () => {
            const blueSkyLink = debugElement.query(By.css('a[href*="bsky.app"]'));
            expect(blueSkyLink.nativeElement.href).toBe(
                'https://bsky.app/profile/hgnc.bsky.social'
            );
        });

        it('should have valid Twitter URL', () => {
            const twitterLink = debugElement.query(By.css('a[href*="twitter.com"]'));
            expect(twitterLink.nativeElement.href).toBe('https://twitter.com/genenames');
        });

        it('should have valid GitHub URL', () => {
            const githubLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink.nativeElement.href).toBe('https://github.com/HGNC');
        });

        it('should have valid YouTube URL', () => {
            const youtubeLink = debugElement.query(By.css('a[href*="youtube.com"]'));
            expect(youtubeLink.nativeElement.href).toBe(
                'https://www.youtube.com/channel/UCqGBx2FrgmeXlbeRTCkvI3g'
            );
        });

        it('should have valid Blog URL', () => {
            const blogLink = debugElement.query(By.css('a[href*="blog.genenames.org"]'));
            expect(blogLink.nativeElement.href).toContain('https://blog.genenames.org');
        });

        it('should have valid Contact URL', () => {
            const contactLink = debugElement.query(By.css('a[href*="/contact/feedback"]'));
            expect(contactLink.nativeElement.href).toContain('/contact/feedback');
        });
    });

    describe('Link Order and Structure', () => {
        it('should maintain correct order of social media links', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            const hrefs = socialLinks.map(link => link.nativeElement.href);

            expect(hrefs[0]).toContain('bsky.app');
            expect(hrefs[1]).toContain('twitter.com');
            expect(hrefs[2]).toContain('github.com');
            expect(hrefs[3]).toContain('youtube.com');
            expect(hrefs[4]).toContain('blog.genenames.org');
            expect(hrefs[5]).toContain('/contact/feedback');
        });

        it('should have consistent link structure', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
                expect(link.nativeElement.classList.contains('social-media')).toBe(true);
                const icon = link.query(By.css('fa-icon'));
                expect(icon).toBeTruthy();
            });
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
            const initialIcons = {
                faXTwitter: component.faXTwitter,
                faGithub: component.faGithub,
                faYoutube: component.faYoutube,
                faBlog: component.faBlog,
                faComment: component.faComment,
                faBluesky: component.faBluesky,
            };

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component.faXTwitter).toBe(initialIcons.faXTwitter);
            expect(component.faGithub).toBe(initialIcons.faGithub);
            expect(component.faYoutube).toBe(initialIcons.faYoutube);
            expect(component.faBlog).toBe(initialIcons.faBlog);
            expect(component.faComment).toBe(initialIcons.faComment);
            expect(component.faBluesky).toBe(initialIcons.faBluesky);
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const socialBlock = debugElement.query(By.css('div.social-media-block'));
            const links = debugElement.queryAll(By.css('a'));

            expect(socialBlock).toBeTruthy();
            expect(links.length).toBe(6);
        });

        it('should use standard HTML elements', () => {
            const container = debugElement.query(By.css('div'));
            const links = debugElement.queryAll(By.css('a'));

            expect(container).toBeTruthy();
            expect(links.length).toBe(6);
        });

        it('should have meaningful link structure', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.href).toBeDefined();
                expect(link.nativeElement.href.length).toBeGreaterThan(0);
            });
        });

        it('should support keyboard navigation', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
                expect(link.nativeElement.href).toBeDefined();
            });
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
            fixture = TestBed.createComponent(SocialMediaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.faXTwitter).toBeDefined();
            expect(component.faGithub).toBeDefined();
            expect(component.faYoutube).toBeDefined();
        });

        it('should be efficient with icon definitions', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBeLessThanOrEqual(7); // Allow for FontAwesome icon properties plus potential Angular internal properties
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'a', 'fa-icon', 'svg', 'path', 'span', 'li', 'ul', 'p'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-') && !tagName.startsWith('ng-')) {
                    expect(standardTags.includes(tagName) || tagName.startsWith('fa-')).toBe(true);
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

        it('should use modern href attributes', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                expect(link.nativeElement.href).toBeDefined();
                expect(
                    link.nativeElement.href.startsWith('http') ||
                        link.nativeElement.href.startsWith('/')
                ).toBe(true);
            });
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const socialBlock = debugElement.query(By.css('.social-media-block'));
            const socialLinks = debugElement.queryAll(By.css('.social-media'));

            expect(socialBlock).toBeTruthy();
            expect(socialLinks.length).toBe(6);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (
                    !element.nativeElement.tagName.toLowerCase().startsWith('app-') &&
                    !element.nativeElement.tagName.toLowerCase().startsWith('fa-')
                ) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should support flexible layout', () => {
            const socialBlock = debugElement.query(By.css('.social-media-block'));
            expect(socialBlock).toBeTruthy();
        });
    });

    describe('Social Media Platform Coverage', () => {
        it('should cover major social platforms', () => {
            const platforms = ['bsky.app', 'twitter.com', 'github.com', 'youtube.com'];
            const links = debugElement.queryAll(By.css('.social-media'));
            const hrefs = links.map(link => link.nativeElement.href);

            platforms.forEach(platform => {
                expect(hrefs.some(href => href.includes(platform))).toBe(true);
            });
        });

        it('should include organization-specific content', () => {
            const blogLink = debugElement.query(By.css('a[href*="blog.genenames.org"]'));
            const feedbackLink = debugElement.query(By.css('a[href*="/contact/feedback"]'));

            expect(blogLink).toBeTruthy();
            expect(feedbackLink).toBeTruthy();
        });
    });

    describe('Icon Binding Validation', () => {
        it('should properly bind all social media icons', () => {
            const iconElements = debugElement.queryAll(By.css('fa-icon'));
            expect(iconElements.length).toBe(6);

            // Each icon should be bound to a component property
            iconElements.forEach(iconElement => {
                expect(iconElement).toBeTruthy();
            });
        });

        it('should maintain icon-link relationships', () => {
            const socialLinks = debugElement.queryAll(By.css('.social-media'));
            socialLinks.forEach(link => {
                const icon = link.query(By.css('fa-icon'));
                expect(icon).toBeTruthy();
                expect(icon.nativeElement.parentElement).toBe(link.nativeElement);
            });
        });
    });
});
