
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WellbeingPlugin, "Wellbeing",
    CAP_PLUGIN_METHOD(getScreenTime, CAPPluginReturnPromise);
)

