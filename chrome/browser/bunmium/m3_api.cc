#include "chrome/browser/bunmium/m3_api.h"

#include "base/strings/string_util.h"

namespace bunmium {

bool IsM3Resource(std::string_view resource_name) {
  return base::StartsWith(resource_name, "m3/", base::CompareCase::SENSITIVE);
}

}  // namespace bunmium
