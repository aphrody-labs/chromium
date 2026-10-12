#ifndef CONTENT_BUNMIUM_M3_CONTENT_CONTRACT_H_
#define CONTENT_BUNMIUM_M3_CONTENT_CONTRACT_H_

namespace bunmium {

// Content-process ownership marker for the isolated M3 renderer surface.
struct M3ContentContract {
  static constexpr int kVersion = 1;
};

}  // namespace bunmium

#endif  // CONTENT_BUNMIUM_M3_CONTENT_CONTRACT_H_
