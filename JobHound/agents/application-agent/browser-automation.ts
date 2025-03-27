/**
 * Browser Automation for Job Applications
 *
 * This module handles browser automation for filling out job application forms
 * using Playwright. It supports both headless and visible browser modes.
 */

import { chromium, firefox, webkit, Browser, Page, BrowserContext } from 'playwright';

export class BrowserAutomation {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  /**
   * Initialize browser automation
   */
  async initialize({
    browserType = 'chromium',
    headless = false,
    slowMo = 50, // Slow down operations for visibility and reliability
    userDataDir = './browser-data', // For persistent sessions
  }: {
    browserType?: 'chromium' | 'firefox' | 'webkit';
    headless?: boolean;
    slowMo?: number;
    userDataDir?: string;
  } = {}) {
    // Launch the appropriate browser
    if (browserType === 'firefox') {
      this.browser = await firefox.launch({ headless, slowMo });
    } else if (browserType === 'webkit') {
      this.browser = await webkit.launch({ headless, slowMo });
    } else {
      this.browser = await chromium.launch({ headless, slowMo });
    }

    // Create a browser context with persistent storage
    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      viewport: { width: 1280, height: 800 },
      storageState: userDataDir ? `${userDataDir}/storage.json` : undefined,
    });

    // Create a new page
    this.page = await this.context.newPage();

    console.log(`Browser automation initialized (${browserType}, headless: ${headless})`);

    return this;
  }

  /**
   * Navigate to a URL
   */
  async navigate(url: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('networkidle');

    return this;
  }

  /**
   * Fill a form field
   */
  async fillField(selector: string, value: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Filling field ${selector} with value: ${value}`);

    // Wait for the field to be visible
    await this.page.waitForSelector(selector, { state: 'visible' });

    // Clear the field before filling
    await this.page.fill(selector, '');

    // Fill the field with the value
    await this.page.fill(selector, value);

    return this;
  }

  /**
   * Click an element
   */
  async click(selector: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Clicking element ${selector}`);

    // Wait for the element to be visible
    await this.page.waitForSelector(selector, { state: 'visible' });

    // Click the element
    await this.page.click(selector);

    return this;
  }

  /**
   * Upload a file
   */
  async uploadFile(selector: string, filePath: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Uploading file ${filePath} to ${selector}`);

    // Set file input
    await this.page.setInputFiles(selector, filePath);

    return this;
  }

  /**
   * Select an option from a dropdown
   */
  async selectOption(selector: string, value: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Selecting option ${value} from ${selector}`);

    // Select the option
    await this.page.selectOption(selector, value);

    return this;
  }

  /**
   * Extract text from an element
   */
  async extractText(selector: string) {
    if (!this.page) throw new Error('Browser not initialized');

    // Wait for the element to be visible
    await this.page.waitForSelector(selector, { state: 'visible' });

    // Get the text content
    const text = await this.page.textContent(selector);

    return text;
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(path: string) {
    if (!this.page) throw new Error('Browser not initialized');

    console.log(`Taking screenshot: ${path}`);

    // Take the screenshot
    await this.page.screenshot({ path });

    return this;
  }

  /**
   * Close the browser
   */
  async close() {
    if (this.browser) {
      console.log('Closing browser');
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }

  /**
   * Apply for a job using a predefined template
   */
  async applyForJob({
    applicationUrl,
    userProfile,
    resumePath,
    coverLetterPath,
    template,
  }: {
    applicationUrl: string;
    userProfile: any;
    resumePath: string;
    coverLetterPath: string;
    template: 'linkedin' | 'indeed' | 'glassdoor' | 'generic';
  }) {
    try {
      // Navigate to the job application page
      await this.navigate(applicationUrl);

      // Use different application flows based on the template
      switch (template) {
        case 'linkedin':
          // TODO: Implement LinkedIn-specific application flow
          await this.linkedInApplication(userProfile, resumePath, coverLetterPath);
          break;

        case 'indeed':
          // TODO: Implement Indeed-specific application flow
          await this.indeedApplication(userProfile, resumePath, coverLetterPath);
          break;

        case 'glassdoor':
          // TODO: Implement Glassdoor-specific application flow
          await this.glassdoorApplication(userProfile, resumePath, coverLetterPath);
          break;

        default:
          // Generic application flow
          await this.genericApplication(userProfile, resumePath, coverLetterPath);
          break;
      }

      // Take a screenshot for confirmation
      await this.takeScreenshot(`./screenshots/application-${new Date().toISOString()}.png`);

      return {
        success: true,
        message: 'Application submitted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error applying for job:', error);

      // Take a screenshot of the error state
      if (this.page) {
        await this.takeScreenshot(`./screenshots/application-error-${new Date().toISOString()}.png`);
      }

      return {
        success: false,
        message: `Error applying for job: ${error}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * LinkedIn application process (stub)
   */
  private async linkedInApplication(userProfile: any, resumePath: string, coverLetterPath: string) {
    // This is a stub implementation
    console.log('Using LinkedIn application template');

    // LinkedIn application logic would go here
    // ...

    return this;
  }

  /**
   * Indeed application process (stub)
   */
  private async indeedApplication(userProfile: any, resumePath: string, coverLetterPath: string) {
    // This is a stub implementation
    console.log('Using Indeed application template');

    // Indeed application logic would go here
    // ...

    return this;
  }

  /**
   * Glassdoor application process (stub)
   */
  private async glassdoorApplication(userProfile: any, resumePath: string, coverLetterPath: string) {
    // This is a stub implementation
    console.log('Using Glassdoor application template');

    // Glassdoor application logic would go here
    // ...

    return this;
  }

  /**
   * Generic application process (stub)
   */
  private async genericApplication(userProfile: any, resumePath: string, coverLetterPath: string) {
    // This is a stub implementation
    console.log('Using generic application template');

    // Find and fill common form fields
    await this.fillField('input[name="name"], input[id*="name"], input[placeholder*="name"]',
      `${userProfile.firstName} ${userProfile.lastName}`);

    await this.fillField('input[name="email"], input[id*="email"], input[type="email"]',
      userProfile.email);

    await this.fillField('input[name="phone"], input[id*="phone"], input[type="tel"]',
      userProfile.phone);

    // Upload resume if file input is available
    try {
      await this.uploadFile('input[type="file"], input[name*="resume"], input[accept=".pdf,.docx,.doc"]',
        resumePath);
    } catch (error) {
      console.log('Could not find resume upload field');
    }

    // Upload cover letter if file input is available
    try {
      await this.uploadFile('input[type="file"]:nth-child(2), input[name*="cover"], input[accept=".pdf,.docx,.doc"]:nth-child(2)',
        coverLetterPath);
    } catch (error) {
      console.log('Could not find cover letter upload field');
    }

    // Submit the form
    await this.click('button[type="submit"], input[type="submit"], button:contains("Apply"), button:contains("Submit")');

    // Wait for submission confirmation
    await this.page!.waitForSelector('.confirmation, .success, [data-testid="success"], .application-confirmed',
      { state: 'visible', timeout: 10000 })
      .catch(() => console.log('Could not find confirmation element'));

    return this;
  }
}