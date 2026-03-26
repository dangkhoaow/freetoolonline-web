import { expect, test } from '@playwright/test';
import {
  NEW_ORIGIN,
  OLD_ORIGIN,
  buildRouteUrl,
  captureSnapshot,
  compareSnapshots,
  formatDiff,
  loadParityRoutes,
  navigateAndStabilize,
  prepareParityContext,
} from '../helpers/parity.mjs';

const routes = await loadParityRoutes();

test.describe.configure({ mode: 'parallel' });

for (const route of routes) {
  test(`parity ${route}`, async ({ browser }, testInfo) => {
    const context = await browser.newContext();

    try {
      await prepareParityContext(context);

      const oldPage = await context.newPage();
      const newPage = await context.newPage();

      await Promise.all([
        navigateAndStabilize(oldPage, buildRouteUrl(OLD_ORIGIN, route), route),
        navigateAndStabilize(newPage, buildRouteUrl(NEW_ORIGIN, route), route),
      ]);

      const oldSnapshot = await captureSnapshot(oldPage);
      const newSnapshot = await captureSnapshot(newPage);
      const diffs = compareSnapshots(oldSnapshot, newSnapshot);

      if (diffs.length > 0) {
        await testInfo.attach('old-screenshot.png', {
          body: await oldPage.screenshot({ fullPage: true }),
          contentType: 'image/png',
        });
        await testInfo.attach('new-screenshot.png', {
          body: await newPage.screenshot({ fullPage: true }),
          contentType: 'image/png',
        });
        await testInfo.attach('old-content.html', {
          body: oldSnapshot.contentHtml,
          contentType: 'text/html',
        });
        await testInfo.attach('new-content.html', {
          body: newSnapshot.contentHtml,
          contentType: 'text/html',
        });
        await testInfo.attach('old-snapshot.json', {
          body: JSON.stringify(oldSnapshot, null, 2),
          contentType: 'application/json',
        });
        await testInfo.attach('new-snapshot.json', {
          body: JSON.stringify(newSnapshot, null, 2),
          contentType: 'application/json',
        });
      }

      expect(diffs, formatDiff(route, diffs)).toHaveLength(0);
    } finally {
      await context.close();
    }
  });
}

test('left menu highlights current route (zip-file)', async ({ browser }, testInfo) => {
  const context = await browser.newContext();

  try {
    await prepareParityContext(context);

    const route = '/zip-file.html';
    const oldPage = await context.newPage();
    const newPage = await context.newPage();

    await Promise.all([
      oldPage.goto(buildRouteUrl(OLD_ORIGIN, route), { waitUntil: 'load' }),
      newPage.goto(buildRouteUrl(NEW_ORIGIN, route), { waitUntil: 'load' }),
    ]);

    await Promise.all([
      oldPage.waitForFunction(() => typeof window.$ === 'function', null, { timeout: 15000 }).catch(() => {}),
      newPage.waitForFunction(() => typeof window.$ === 'function', null, { timeout: 15000 }).catch(() => {}),
    ]);

    await Promise.all([
      oldPage.click('.menuToogle').catch(() => {}),
      newPage.click('.menuToogle').catch(() => {}),
    ]);

    await Promise.all([
      oldPage.waitForSelector('#nav_menu', { state: 'visible', timeout: 8000 }).catch(() => {}),
      newPage.waitForSelector('#nav_menu', { state: 'visible', timeout: 8000 }).catch(() => {}),
    ]);

    const readState = async (page) => {
      return await page.evaluate(() => {
        const activeHrefs = Array.from(document.querySelectorAll('#nav_menu a.active')).map((a) => a.getAttribute('href') ?? '');
        const expandedGroups = Array.from(document.querySelectorAll('#nav_menu .menuGroup.w3-show')).map((el) => el.id ?? '');
        return { activeHrefs, expandedGroups };
      });
    };

    const [oldState, newState] = await Promise.all([readState(oldPage), readState(newPage)]);
    const oldHasZipActive = oldState.activeHrefs.some((href) => href.includes('/zip-file.html'));
    const newHasZipActive = newState.activeHrefs.some((href) => href.includes('/zip-file.html'));
    const oldHasZipExpanded = oldState.expandedGroups.includes('zipMenu');
    const newHasZipExpanded = newState.expandedGroups.includes('zipMenu');

    if (oldHasZipActive !== newHasZipActive || oldHasZipExpanded !== newHasZipExpanded) {
      await testInfo.attach('leftmenu-old-screenshot.png', {
        body: await oldPage.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
      await testInfo.attach('leftmenu-new-screenshot.png', {
        body: await newPage.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
      await testInfo.attach('leftmenu-state.json', {
        body: JSON.stringify({ oldState, newState }, null, 2),
        contentType: 'application/json',
      });
    }

    expect(oldHasZipActive, 'Old site should mark zip-file active.').toBeTruthy();
    expect(oldHasZipExpanded, 'Old site should expand zipMenu group.').toBeTruthy();
    expect(newHasZipActive, 'New site should mark zip-file active.').toBeTruthy();
    expect(newHasZipExpanded, 'New site should expand zipMenu group.').toBeTruthy();
  } finally {
    await context.close();
  }
});

test('hr margin + color matches old site (zip-file)', async ({ browser }, testInfo) => {
  const context = await browser.newContext();

  try {
    await prepareParityContext(context);

    const route = '/zip-file.html';
    const oldPage = await context.newPage();
    const newPage = await context.newPage();

    await Promise.all([
      oldPage.goto(buildRouteUrl(OLD_ORIGIN, route), { waitUntil: 'load' }),
      newPage.goto(buildRouteUrl(NEW_ORIGIN, route), { waitUntil: 'load' }),
    ]);

    await Promise.all([
      oldPage.waitForSelector('.page-main-content time + hr, #content time + hr, time + hr', { timeout: 15000 }).catch(() => {}),
      newPage.waitForSelector('.page-main-content time + hr, #content time + hr, time + hr', { timeout: 15000 }).catch(() => {}),
    ]);

    const readHr = async (page) => {
      return await page.evaluate(() => {
        const hr = document.querySelector('.page-main-content time + hr') || document.querySelector('#content time + hr') || document.querySelector('time + hr');
        if (!hr) {
          return null;
        }
        const s = getComputedStyle(hr);
        return {
          marginTop: s.marginTop,
          marginBottom: s.marginBottom,
          borderTopWidth: s.borderTopWidth,
          borderTopStyle: s.borderTopStyle,
          borderTopColor: s.borderTopColor,
        };
      });
    };

    const [oldHr, newHr] = await Promise.all([readHr(oldPage), readHr(newPage)]);

    if (JSON.stringify(oldHr) !== JSON.stringify(newHr)) {
      await testInfo.attach('hr-old-screenshot.png', {
        body: await oldPage.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
      await testInfo.attach('hr-new-screenshot.png', {
        body: await newPage.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
      await testInfo.attach('hr-style.json', {
        body: JSON.stringify({ oldHr, newHr }, null, 2),
        contentType: 'application/json',
      });
    }

    expect(oldHr, 'Old site should have an <hr> after Last updated.').toBeTruthy();
    expect(newHr, 'New site should have an <hr> after Last updated.').toBeTruthy();
    expect(newHr, 'New site <hr> style should match old site.').toEqual(oldHr);
  } finally {
    await context.close();
  }
});
