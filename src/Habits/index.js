import { connect } from "react-redux";

import HabitsComponent from "./component";

const mapStateToProps = state => {
  return {
    habits: state.habits
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Habits = connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitsComponent);

export default Habits;
