import { library , dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

dom.watch() // This will kick of the initial replacement of i to svg tags and configure a MutationObserver