#ifndef COMPONENTS_BUNMIUM_M3_COMPONENT_CONTRACT_H_
#define COMPONENTS_BUNMIUM_M3_COMPONENT_CONTRACT_H_

namespace bunmium {

// Components-process ownership marker for shared M3 browser capabilities.
struct M3ComponentContract {
  static constexpr int kVersion = 1;
};

}  // namespace bunmium

#endif  // COMPONENTS_BUNMIUM_M3_COMPONENT_CONTRACT_H_
