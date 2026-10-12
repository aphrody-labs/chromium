#ifndef CHROME_BROWSER_BUNMIUM_M3_API_H_
#define CHROME_BROWSER_BUNMIUM_M3_API_H_

#include <string_view>

namespace bunmium {

// Stable browser-side entry point for M3 resources. Bun bindings call this
// boundary; Chromium does not expose arbitrary host privileges to web pages.
bool IsM3Resource(std::string_view resource_name);

}  // namespace bunmium

#endif  // CHROME_BROWSER_BUNMIUM_M3_API_H_
