//
//  Heating.swift
//  Heating
//
//  Created by Mariasiu Vlad on 31/10/2020.
//

import WidgetKit
import SwiftUI

struct SharedHeatingStatus:Decodable {
  let success: Bool,
      state: Int
}

struct SharedTempValues:Decodable {
  let temp: Float
}

struct Provider: TimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), heatingOn: false, temp: 22.6)
  }

  func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date(), heatingOn: false, temp: 22.6)
      completion(entry)
  }
  
  func isHeatingOn(sharedDefaults: (UserDefaults?)) -> Bool {
    do {
      let shared = sharedDefaults?.string(forKey: "SharedHeatingStatus")
      if(shared != nil) {
        let data = try JSONDecoder().decode(SharedHeatingStatus.self, from: shared!.data(using: .utf8)!)
        return data.state == 1
      }
    } catch {
      print(error)
    }
    return false
  }
  
  func getTemp(sharedDefaults: (UserDefaults?)) -> Float32 {
    do {
      let shared = sharedDefaults?.string(forKey: "SharedTempValues")
      if(shared != nil) {
        let data = try JSONDecoder().decode(SharedTempValues.self, from: shared!.data(using: .utf8)!)
        return data.temp
      }
    } catch {
      print(error)
    }
    return 0.0
  }

  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var heatingOn = false
    var temp: Float32 = 0.0
    let sharedDefaults = UserDefaults.init(suiteName: "group.mariasiuvlad.seiiki")
    if sharedDefaults != nil {
      heatingOn = isHeatingOn(sharedDefaults: sharedDefaults)
      temp = getTemp(sharedDefaults: sharedDefaults)
      print("[getTimeline] heatingOn")
      print(heatingOn)
      print(temp)
    }
    let entries = [SimpleEntry(date: Date(), heatingOn: heatingOn, temp: temp)]
    
    let reloadTime = Calendar.current.date(byAdding: .minute, value: 1, to: Date())!
    let timeline = Timeline(entries: entries, policy: .after(reloadTime))
    
    completion(timeline)
  }
}
 
struct SimpleEntry: TimelineEntry {
    let date: Date
    let heatingOn: Bool
    let temp: Float
}

struct RN_widgetEntryView : View {
  var entry: Provider.Entry
  var body: some View {
    ZStack(alignment: .topLeading) {
      Color(UIColor.systemBackground)
      VStack(alignment: .leading) {
        Text(entry.heatingOn ? "ON" : "OFF")
          .font(.system(size: 13, weight: .medium))
          .foregroundColor(entry.heatingOn ? .red : .blue)
        
        Text(String(format: "%.0f°", entry.temp)).font(.system(size: 34, weight: .light, design: .rounded))
        Spacer().frame(height: 6)
        
        VStack(alignment: .leading) {
          Text("Turns on")
            .font(.system(size: 14, weight: .medium))
            .foregroundColor(.primary)
          Text("6:00\u{2009}−\u{2009}8:00")
            .font(.system(size: 14))
            .foregroundColor(.secondary)
        }.padding(.leading, 8)
         .padding(.vertical, 2)
        .overlay(
          RoundedRectangle(cornerRadius: 2).fill(Color.orange).frame(width: 4.0),     // << here !!
          alignment: .leading
        )
      }.padding()
    }
  }
}

@main
struct RN_widget: Widget {
    let kind: String = "RN_widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            RN_widgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

struct RN_widget_Previews: PreviewProvider {
    static var previews: some View {
      RN_widgetEntryView(entry: SimpleEntry(date: Date(), heatingOn: true, temp: 22.6))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
