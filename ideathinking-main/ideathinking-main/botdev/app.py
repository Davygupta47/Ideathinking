from flask import Flask, render_template, request, jsonify
import pandas as pd
app = Flask(__name__)

df = pd.read_csv(r'C:\Users\USER\Downloads\IDEATHINKING-MAIN\ideathinking-main\botdev\updated_movies(5).csv', encoding='latin-1')


def make_prediction(genre, mood, language, time_period, director=None):
    # Filter based on the time period
    if time_period == "old":
        print(time_period)
        filtered_df = df[df['release_date'] < 1995]
    elif time_period == "moderate":
        filtered_df = df[(df['release_date'] >= 1995) & (df['release_date'] <= 2019)]
    elif time_period == "new":
        filtered_df = df[df['release_date'] >= 2020]
    else:
        filtered_df = df  # No filtering if no time period is provided

    filtered_df = filtered_df[
        (filtered_df['genres'].str.lower().str.contains(genre.lower())) &
        (filtered_df['mood'].str.lower().str.contains(mood.lower())) &
        (filtered_df['spoken_languages'].str.lower().str.contains(language.lower()))
    ]

    if director:
        filtered_df = filtered_df[filtered_df['director'].str.lower().str.contains(director.lower())]

    if len(filtered_df) > 1:
        return filtered_df['title'].head(2).tolist()
    else:
        return filtered_df['title'].tolist()

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    genre = data.get("genre")
    mood = data.get("mood")
    language = data.get("language")
    time_period = data.get("time_period")
    director = data.get("director", None)

    print(time_period)

    recommendations = make_prediction(genre, mood, language, time_period, director)
    return jsonify(recommendations)

@app.route('/')
def home():
    return render_template('index.html')  # or another HTML file name

if __name__ == '__main__':
    app.run(debug=True)